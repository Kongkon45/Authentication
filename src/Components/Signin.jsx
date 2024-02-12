import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import firebaseConfig from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword, onAuthStateChanged
} from "firebase/auth";

const Signin = () => {

  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = () => {
    if (!email && !password) {
      setErr("Fill the all details");
    } else if (!email) {
      setErr("Enter your email");
    } else if (!password) {
      setErr("Enter your password");
    } else if (password.length < 7) {
      setErr("password need minimum 8 character");
    } else {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        setErr("")
        navigate("/")
        
      })
      .catch((error) => {
        console.log(error.code)
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
        <h1>Sign in your Account</h1>
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
        <button onClick={handleSubmit}>Sign in</button>
        <Link to="/signup">you have don't account? Signup</Link>
      </div>
    </div>
  )
}

export default Signin