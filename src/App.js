import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/HomePage";
import Signin from "./components/SigninPage";
import { app } from "./firebase";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const App = () => {
  const [signedIn, setSignedIn] = useState(false);

  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return setSignedIn(true);
    }

    setSignedIn(false);
  });

  if (signedIn === true) {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Signin} />
        </Switch>
      </Router>
    );
  }
};

export default App;
