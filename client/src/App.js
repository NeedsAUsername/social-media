import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import Users from './users';
import Posts from './posts';
import Auth from './auth';
import Navbar from './components/navbar';
import Chat from './chat';
import {fetchUsers} from './actions/users/fetchUsers';
import {fetchCurrentUser} from './actions/auth/fetchCurrentUser';

const routes = [
  {path: '/', name: 'Home'},
  {path: '/posts', name: 'Posts'},
  {path: '/users', name: 'Users'},
]

class App extends Component {
  componentDidMount() {
    this.props.fetchUsers();
    if (!!localStorage.token) {
      this.props.fetchCurrentUser();
    }
  }
  render() {
    return (
      <Router>
        <div className="app">
          <Navbar routes={routes}/>
          <Route exact path='/' component={Chat} />
          <Route exact path='/account' component={Auth} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/posts' component={Posts} />
        </div>
      </Router>
    );
  }
}


export default connect(null, {fetchUsers, fetchCurrentUser})(App);
