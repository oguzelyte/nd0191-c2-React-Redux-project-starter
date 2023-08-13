import React from 'react';
import './App.css';
import { useEffect, Fragment } from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import Nav from './components/Nav';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Auth from './utils/Auth';

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <LoadingBar />
      {props.authedUser && <Nav authedUserData={props.authedUserData} />}
      <div className="container">
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          />
          <Route
            path="/new"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          />
          <Route path="/login" element={props.authedUser ? <Navigate to="/" /> : <Login />} />
        </Routes>
      </div>
    </Fragment>
  );
}

function mapStateToProps({ authedUser, users }) {
  const arrUsers = Object.keys(users).map((key) => users[key]);

  return {
    loading: users === null,
    authedUser: authedUser,
    authedUserData: authedUser ? arrUsers.find((user) => user.id === authedUser) : null
  };
}

export default connect(mapStateToProps)(App);
