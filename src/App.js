import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import NotesList from './components/NotesList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateTeam from './components/CreateTeam';
import TeamSearch from './components/teams/TeamSearch';
import Team from './components/teams/Team';
import PrivateRoute from './components/private-route/PrivateRoute';

// use the follow in order to track if user is logged in still after reloads
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './redux/actions/authActions';

// redux stuff
import {Provider} from 'react-redux';
import store from './redux/store';

// check for token to keep user logged in
if (localStorage.jwtToken){
  // set auth token header since the user is logged in already
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // decode token to get user info and exp (expiration time)
  const decodedToken = jwt_decode(token);
  // set isAuth for user to be authenticated
  store.dispatch(setCurrentUser(decodedToken));

  // log out the user if the token has expired
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime){
    store.dispatch(logoutUser());
    // redirect to login after log the user out
    window.location.href = './login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <PrivateRoute exact path="/" component = {Home} />
        <PrivateRoute exact path="/notes/:id" component = {NotesList} />
        <PrivateRoute path="/team/:id" component = {Team} />
        <PrivateRoute path="/teamsearch" component = {TeamSearch} />
        <Route exact path="/login" component = {Login} />
        <Route exact path="/register" component = {Register} />
        <PrivateRoute exact path="/createTeam" component = {CreateTeam} />
      </Router>
    </Provider>
  );
}

export default App;
