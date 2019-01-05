import React from 'react';

class ChatInput extends React.Component {
  state = {
    content: {
      text: "",
      imageLink: ""
    }
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      content: {
        ...this.state.content,
        [e.target.name]: e.target.value
      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.state.content);
    this.setState({
      content: {
        text: "",
        imageLink: ""
      }
    })
  }
  render () {
    return (
      <form className="chat-form" onSubmit={this.handleSubmit}>
        <input className="input" name="text" onChange={this.handleChange} value={this.state.content.text} placeholder="Enter a message"/>
        <input className="input" name="imageLink" onChange={this.handleChange} value={this.state.content.imageLink} placeholder="Enter an image link"/>
        <button className="button">Send</button>
      </form>
    )
  }
}

export default ChatInput;
