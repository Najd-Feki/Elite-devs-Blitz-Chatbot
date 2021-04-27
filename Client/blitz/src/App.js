import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routing/Routes";
import { LOGOUT } from "./actions/types";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

/*************/
import "style.css";
import Home from "pages/Home.js";
import "tailwindcss/dist/base.css";
//import "styles/globalStyles.css";

import Progress from "pages/Progress";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";
import Chatbot from "./components/chatbot/chatbot";
import MetaTags from "react-meta-tags";
import Profile from "pages/Profile";
import Contact from "pages/ContactUs";
import About from "pages/AboutUs";
import event from "pages/Event";
import EventDetail from "pages/EventDetail";
import HomeAdmin from "pages/HomeAdmin";
import ReclamationAdmin from "pages/ReclamationAdmin";
import UsersAdmin from "pages/UsersAdmin";
import ConnectingUsers from "pages/ConnectingUsers";
import Classification from "pages/Classification";
import Reclamation from "pages/Reclamation";
import Login from "pages/Login";
import CoursesHome from "components/coursesHome/CoursesHome";
import { CourseForm } from "components/courseForm/CourseForm";
import CourseDetails from "components/adminCourse/CourseDetails";
function App() {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Switch>
              <Route path="/profile/:id" render={(props) => <Profile {...props} />} />
              <Route path="/reclamation" component={Reclamation}></Route>
              <Route path="/classification" component={Classification}></Route>
              <Route path="/connecting" component={ConnectingUsers}></Route>
              <Route path="/users" component={UsersAdmin}></Route>
              <Route path="/reclamationAdmin" component={ReclamationAdmin}></Route>
              <Route path="/adminhome" component={HomeAdmin}></Route>
              <Route path="/profile" component={Profile}></Route>
              <Route path="/contact" component={Contact}></Route>
              <Route path="/about" component={About}></Route>
              <Route path="/event" component={event}></Route>
              <Route path="/eventdetail/:id" component={EventDetail}></Route>
              <Route path="/progress" component={Progress}></Route>
              <Route path="/course" component={CoursesHome}></Route>
              <Route path="/admin" component={CourseForm}></Route>
              <Route path="/details" component={CourseDetails}></Route>

              <Route exact path="/" component={Home}></Route>
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
        <Chatbot></Chatbot>
      </Provider>
    </>
  );
}

export default App;
