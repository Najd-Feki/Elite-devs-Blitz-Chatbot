import "style.css";
import Home from "pages/Home.js";
import "tailwindcss/dist/base.css";
//import "styles/globalStyles.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "pages/Login";
import Profile from "pages/Profile";
import Contact from "pages/ContactUs";
import About from "pages/AboutUs";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

function App() {
  // return <AnimationRevealPage disabled></AnimationRevealPage>;
  return (
    <Router>
      <Switch>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/contact" component={Contact}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
