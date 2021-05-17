import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';
import { LOGOUT } from './actions/types';
import { connect } from 'react-redux';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

/*************/
import 'style.css';
import Home from 'pages/Home.js';
import 'tailwindcss/dist/base.css';
//import "styles/globalStyles.css";
import Login from './components/auth/Login.js';

import Progress from 'pages/Progress';
import 'assets/vendor/nucleo/css/nucleo.css';
import 'assets/vendor/font-awesome/css/font-awesome.min.css';
import './assets/scss/argon-design-system-react.scss?v1.1.0';
import Chatbot from './components/chatbot/chatbot';
import Profile from 'pages/Profile';
import ProfileUpdate from 'pages/ProfileUpdate';
import Contact from 'pages/ContactUs';
import About from 'pages/AboutUs';
import Signup from 'pages/Signup';
import 'assets/vendor/nucleo/css/nucleo.css';
import 'assets/vendor/font-awesome/css/font-awesome.min.css';
import './assets/scss/argon-design-system-react.scss?v1.1.0';
import event from 'pages/Event';
import EventDetail from 'pages/EventDetail';
import HomeAdmin from 'pages/HomeAdmin';
import ReclamationAdmin from 'pages/ReclamationAdmin';
import UsersAdmin from 'pages/UsersAdmin';
import ConnectingUsers from 'pages/ConnectingUsers';
import Classification from 'pages/Classification';
import Reclamation from 'pages/Reclamation';
import CoursesHome from 'components/coursesHome/CoursesHome';
import { CourseForm } from 'components/courseForm/CourseForm';
import CourseDetails from 'components/adminCourse/CourseDetails';
import JobsApp from 'components/jobs/App';
import PrivateRoute from 'components/routing/PrivateRoute';
import DataTable from 'components/adminCourse/DataTable';

function App({ auth }) {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Switch>
              <Route
                path='/profile/:id'
                render={(props) => <Profile {...props} />}
              />
              <Route
                path='/profileupdate/:id'
                render={(props) => <ProfileUpdate {...props} />}
              />
              <Route path='/reclamation' component={Reclamation}></Route>
              <PrivateRoute
                path='/classification'
                component={Classification}
              ></PrivateRoute>

              <PrivateRoute path='/users' component={UsersAdmin}></PrivateRoute>
              <PrivateRoute
                path='/reclamationAdmin'
                component={ReclamationAdmin}
              ></PrivateRoute>

              <Route path='/profile' component={Profile}></Route>
              <Route path='/contact' component={Contact}></Route>
              <Route path='/about' component={About}></Route>
              <Route path='/event' component={event}></Route>
              <Route path='/eventdetail/:id' component={EventDetail}></Route>
              <Route path='/progress' component={Progress}></Route>
              <PrivateRoute path='/admin' component={CourseForm}></PrivateRoute>
              <Route path='/course' component={CoursesHome} user={auth}></Route>
              <Route path='/addCourse' component={CourseForm}></Route>
              <Route path='/CourseList' component={DataTable}></Route>
              <Route path='/details' component={CourseDetails}></Route>
              <Route path='/profile' component={Profile}></Route>
              <Route path='/contact' component={Contact}></Route>
              <Route path='/about' component={About}></Route>
              <Route path='/login' component={Login}></Route>
              <Route path='/signup' component={Signup}></Route>
              <Route path='/jobs/:id' component={JobsApp}></Route>

              <Route exact path='/' component={Home}></Route>
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
        <Chatbot></Chatbot>
      </Provider>
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(App);
