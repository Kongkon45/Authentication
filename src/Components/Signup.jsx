import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import firebaseConfig from "../firebaseConfig";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";

const Signup = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = () => {
    if (!name && !email && !password) {
      setErr("Fill the all details");
    } else if (!name) {
      setErr("Enter your name");
    } else if (!email) {
      setErr("Enter your email");
    } else if (!password) {
      setErr("Enter your password");
    } else if (password.length < 7) {
      setErr("password need minimum 8 character");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          }).then(() => {
            // Profile updated!
            setErr("");
            navigate("/");
          });
        })
        .catch((error) => {
          console.log(error.code);
          if(error.code == "auth/email-already-in-use"){
            setErr("Email already in use")
          }
          else{
            setErr("")
          }
        });
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate('/')
    }
  });
  return (
    <div className="signup">
      <div id="signup">
        <h1>Create a Account</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter your name"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
        />
        <p>{err}</p>
        <button onClick={handleSubmit}>Sign Up</button>
        <Link to="/signin">you have already account? Signin</Link>
      </div>
    </div>
  );
};

export default Signup;
