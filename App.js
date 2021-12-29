import React, { Component, Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import HeroLogo from './images/Company Logo/HeroLogo.png'
import jwtDecode from 'jwt-decode';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './redux/types'

import { PropTypes } from 'prop-types';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';

// Redux
import { connect, Provider } from 'react-redux';
import store from './redux/store';

// Components
import Navbar from './components/Navbar';
import './App.css';

// MUI
import { createTheme } from '@material-ui/core/styles';
import ThemeFile from '../src/util/theme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core';
import { getUserDetails } from './redux/actions/rootActions';
import axios from 'axios';


if(localStorage.FBIdToken) {
  axios.defaults.headers.common['Authorization'] = localStorage.FBIdToken;
}
const token = localStorage.FBIdToken;
console.log("Checking token...")
if (token) {
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()) {
    console.log("TOKEN EXPIRED")
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    //axios.defaults.headers.common['Authorization'] = token;
    // Add something here for the userType to prevent it from refreshing
    console.log("LOGGED IN")
    //axios.defaults.headers.common['Authorization'] = token;
    //store.dispatch(getUserData());
  }
} else {
  store.dispatch({type: SET_UNAUTHENTICATED})
  console.log("LOGGED OUT")
  console.log(token)
}

const App = (props) => {
  let width;

  if (props.authenticated) {
    width = 9
  } else  {
    width = 12
  }

  const uid = {
    uidRequested: localStorage.uid
  }
  //console.log('Printing data...', data)

  props.getUserDetails(uid);

  return (
    <div>
        <Router>
          <Grid container>
            { props.authenticated &&
              <Grid item xs={3}>
                <Navbar userType={props.userType} />
              </Grid>
            }
            <Grid item xs={width}>
              <div style={mainPage}>
                <Routes>
                  <Route exact path="/" element={<Home/>}/>
                  {!props.authenticated && <Route exact path="/login" element={<Login />} /> }
                  {!props.authenticated && <Route exact path="/signup" element={<Signup/>} /> }
                  <Route exact path="/testPage" element={<Signup/>} />
                </Routes>
              </div>
            </Grid>
          </Grid>
        </Router>
    </div>
  );
}

App.propTypes = {
  getUserDetails: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    userType: state.userType
  }
};

const mapDispatchToProps = {
  getUserDetails
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
