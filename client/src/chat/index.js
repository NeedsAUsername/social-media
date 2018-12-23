import React from 'react';
import './chat.css';
import socketIOClient from "socket.io-client";

// outside of class to prevent multiple event fires
// (otherwise it would create a new event listener for every re-re-render)
const socket = socketIOClient('http://localhost:5000');
socket.on('change color', (color) => {
  // setting the color of our button
  document.body.style.backgroundColor = color
})
socket.on('send message', (text) => {
  let mes = document.createElement('li');
  mes.innerHTML = text;
  document.querySelector('.messages').appendChild(mes);
})

class Chat extends React.Component {
  state = {
    color: "",
    message: ""
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.sendMessage(this.state.message);
    this.setState({
      message: ""
    })
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      message: e.target.value
    })
  }
  // method for emitting a socket.io event
  sendColor = (color) => {
    socket.emit('change color', color)
  }
  sendMessage = (message) => {
    socket.emit('send message', message)
    this.messagesEnd.scrollIntoView({block: 'end', behavior: 'smooth'})
  }
  render () {
    return (
      <div>
        <button onClick={() => this.sendColor('blue')}>Blue</button>
        <button onClick={() => this.sendColor('red')}>Red</button>
        <button onClick={() => this.sendColor('yellow')}>Yellow</button>
        <div className="messages-container" ref={(el) => { this.messagesContainer = el; }}>
          <ul className="messages"></ul>
          <div className="end" ref={(el) => { this.messagesEnd = el; }}></div>
        </div>
        <form className="chat-form" onSubmit={(e) => this.handleSubmit(e)}>
          <input onChange={this.handleChange} value={this.state.message}/>
          <button>Send</button>
        </form>
      </div>
    )
  }
}

export default Chat;
