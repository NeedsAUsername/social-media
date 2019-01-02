import React from 'react';

class ChatInput extends React.Component {
  state = {
    message: ""
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      message: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    })
  }
  render () {
    return (
      <form className="chat-form" onSubmit={this.handleSubmit}>
        <input className="input" onChange={this.handleChange} value={this.state.message} placeholder="enter a message"/>
        <button className="button">Send</button>
      </form>
    )
  }
}

export default ChatInput;
