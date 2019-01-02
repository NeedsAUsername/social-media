import React from 'react';
import {connect} from 'react-redux';
import './auth.css';
import AuthInput from './input.js';
import {signup} from '../actions/auth/signup';
import {login} from '../actions/auth/login';
import {logout} from '../actions/auth/logout';

class Auth extends React.Component {
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
    if (this.state.formShown === "Signup") {
      this.props.signup(formState);
    } else if (this.state.formShown === "Login") {
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
      <button onClick={(e) => this.handleClick(e, "Login")}>Login</button>
      <button onClick={(e) => this.handleClick(e, "Signup")}>Signup</button>
      {this.state.formShown ? this.renderForm() : null}
    </React.Fragment>
  )
  renderForm = () => (
    <AuthInput title={this.state.formShown} formShown={this.state.formShown} formAction={this.formAction} hide={this.hide}/>
  )
  renderLogOut = () => (
    <div>
      <h2>{this.props.userName}({this.props.email})</h2>
      <button onClick={this.props.logout}>Logout</button>
    </div>
  )
  render () {
    return (
      <div>
        {this.props.loggedIn ? this.renderLogOut() : this.renderButtons()}
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  return {
    loggedIn: store.currentUser.authenticated,
    userName: store.currentUser.name,
    email: store.currentUser.email
  }
}

export default connect(mapStateToProps, {signup, login, logout})(Auth);
