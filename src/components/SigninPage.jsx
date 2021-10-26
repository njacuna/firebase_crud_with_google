import React from "react";
import { app } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Signin = () => {
  const SigninWithGoogle = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider(auth);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <button onClick={SigninWithGoogle}>Sign in with Google</button>;
};

export default Signin;
