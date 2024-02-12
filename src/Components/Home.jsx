import React from 'react'
import { getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      navigate("/signin")
    }).catch((error) => {
      console.log(error.code)
    });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(auth.currentUser)
    } else {
      navigate('/signin')
    }
  });
  return (
    <div> 
      <h1>Home page</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      <h3>{auth.currentUser.photoURL}</h3>
    </div>
  )
}

export default Home