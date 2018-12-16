import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import Users from './users';
import Posts from './posts';
import Auth from './auth';
import Navbar from './components/navbar';
import {fetchUsers} from './actions/users/fetchUsers';
import {fetchCurrentUser} from './actions/auth/fetchCurrentUser';


class App extends Component {
  componentDidMount() {
    this.props.fetchUsers();
    if (!!localStorage.token) {
      this.props.fetchCurrentUser();
    }
  }
  render() {
    return (
      // todo: Setup routes for different pages(user profile, users search, posts, etc.)
      // change root component to posts instead of users
      <Router>
        <div className="app">
          <Navbar />
          <Route exact path='/' component={Posts} />
          <Route exact path='/account' component={Auth} />
          <Route exact path='/users' component={Users} />
        </div>
      </Router>
    );
  }
}


export default connect(null, {fetchUsers, fetchCurrentUser})(App);
