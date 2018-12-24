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
        <input onChange={this.handleChange} value={this.state.name} placeholder="Enter a username" required/>
        <button>Join The Chat</button>
      </form>
    )
  }
}

export default ChatInput;
