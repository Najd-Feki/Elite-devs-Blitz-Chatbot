/****/
import React, { Fragment, useEffect } from 'react';
/* import 'App.css';
 */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';
import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Posts from 'components/posts/Posts';

/*************/
import 'style.css';
import Home from 'pages/Home.js';
import 'tailwindcss/dist/base.css';
//import "styles/globalStyles.css";
import Login from 'components/auth/Login';
import Signup from './pages/Signup';

import Profile from 'pages/Profile';
import Contact from 'pages/ContactUs';
import About from 'pages/AboutUs';
import Progress from 'pages/Progress';
import 'assets/vendor/nucleo/css/nucleo.css';
import 'assets/vendor/font-awesome/css/font-awesome.min.css';
import './assets/scss/argon-design-system-react.scss?v1.1.0';
import Chatbot from './components/chatbot/chatbot';
import MetaTags from 'react-meta-tags';

function App() {
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
      <MetaTags>
        <meta
          name='viewport'
          content='width-device-width, initial-scale=1'
        ></meta>
      </MetaTags>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Switch>
              <Route path='/profile' component={Profile}></Route>
              <Route path='/contact' component={Contact}></Route>
              <Route path='/about' component={About}></Route>
              <Route path='/progress' component={Progress}></Route>

              <Route exact path='/' component={Home} />
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
      <Chatbot></Chatbot>
    </>
  );
}

export default App;
