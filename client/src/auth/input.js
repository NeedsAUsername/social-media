import React from 'react';

class authInput extends React.Component {
  state = {
    email: "",
    name: "",
    password: ""
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.formAction(this.state);
    this.setState({
      email: "",
      name: "",
      password: ""
    })
  }
  // show if sign up form
  renderName = () => (
    <React.Fragment >
      <label htmlFor="name">Name</label>
      <input className="input" id="name" type="text" name="name"
        value={this.state.name} onChange={this.handleChange} required/>
    </React.Fragment>
  )
  render () {
    return (
      <div className="modal-bg">
        <div className="auth-container modal-content">
          <div className="close-modal" onClick={this.props.hide}>+</div>

          <h1>{this.props.title}</h1>
          <form className="auth-form" onSubmit={this.handleSubmit}>

            <label htmlFor="email">Email</label>
            <input className="input" id="email" type="email" name="email"
              value={this.state.email} onChange={this.handleChange} required/>

            {this.props.formShown === "Login" ? null : this.renderName()}

            <label htmlFor="password">Password</label>
            <input className="input" id="password" type="password" name="password"
              value={this.state.password} onChange={this.handleChange} required/>

            <input className="button" type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default authInput;
