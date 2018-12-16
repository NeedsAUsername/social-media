import React from 'react';
import {connect} from 'react-redux';
import './auth.css';
import AuthInput from './input.js';
import {signup} from '../actions/auth/signup';
import {login} from '../actions/auth/login';
import {logout} from '../actions/auth/logout';

class Auth extends React.Component {
  // Todo:
  // On login, set token inside local storage
  // If user is logged in, show button to logout
  // Set up redux
  state = {
    formShown: false
  }
  handleClick = (e, form) => {
    e.preventDefault();
    this.setState({
      formShown: form
    }, () => console.log(this.state))
  }
  formAction = (formState) => {
    if (this.state.formShown === "signup") {
      this.props.signup(formState);
    } else if (this.state.formShown === "login") {
      this.props.login(formState);
    } else {
      alert("error - check state formShown value");
    }
  }
  hide = () => {
    this.setState({
      formShown: false
    })
  }
  renderButtons = () => (
    <React.Fragment>
      <button onClick={(e) => this.handleClick(e, "login")}>Login</button>
      <button onClick={(e) => this.handleClick(e, "signup")}>Signup</button>
      {this.state.formShown ? this.renderForm() : null}
    </React.Fragment>
  )
  renderForm = () => (
    <AuthInput title={this.state.formShown} formShown={this.state.formShown} formAction={this.formAction} hide={this.hide}/>
  )
  render () {
    //ToDo: Make button logout
    return (
      <div>
        {this.props.loggedIn ? <button onClick={this.props.logout}>Logout</button> : this.renderButtons()}
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  return {
    loggedIn: store.currentUser.authenticated
  }
}

export default connect(mapStateToProps, {signup, login, logout})(Auth);
