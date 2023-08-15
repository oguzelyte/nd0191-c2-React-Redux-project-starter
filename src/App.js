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
import Leaderboard from './components/Leaderboard';
import Logout from './components/Logout';
import NewPoll from './components/NewPoll';
import QuestionRoute from './components/QuestionRoute';

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
          {/* Login routes */}
          <Route path="/login" element={props.authedUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/logout" element={!props.authedUser ? <Navigate to="/login" /> : <Logout />} />

          {/* App routes */}
          <Route
            path="/"
            exact
            element={
              !props.authedUser ? <Navigate to="/login" state={{ from: '/' }} /> : <Dashboard authedUserData={props.authedUserData} />
            }
          />
          <Route
            path="/leaderboard"
            element={!props.authedUser ? <Navigate to="/login" state={{ from: '/leaderboard' }} /> : <Leaderboard />}
          />
          <Route
            path="/add"
            element={
              !props.authedUser ? <Navigate to="/login" state={{ from: '/add' }} /> : <NewPoll authedUserData={props.authedUserData} />
            }
          />

          <Route path="/questions/:id" element={<QuestionRoute authedUserData={props.authedUserData} />} />

          {/* Catch all route */}
          <Route path="*" element={!props.authedUser ? <Navigate to="/login" /> : <Navigate to="/" />} />
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
