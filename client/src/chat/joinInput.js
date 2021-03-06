import React from 'react';

class ChatInput extends React.Component {
  state = {
    name: ""
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      name: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.joinChat(this.state.name);
    this.setState({
      name: ""
    })
  }
  render () {
    return (
      <form className="join-form" onSubmit={this.handleSubmit}>
        <input className="input" onChange={this.handleChange} value={this.state.name} maxlength="7" placeholder="Enter a username (Max 7 characters)" required/>
        <button className="button">Join The Chat!</button>
      </form>
    )
  }
}

export default ChatInput;
