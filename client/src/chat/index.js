import React from 'react';
import './chat.css';
import socketIOClient from "socket.io-client";

// outside of class to prevent multiple emits
const socket = socketIOClient('http://localhost:5000');
socket.on('change color', (color) => {
  // setting the color of our button
  document.body.style.backgroundColor = color
})
socket.on('send message', (text) => {
  let mes = document.createElement('li');
  mes.textContent = text;
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
  }
  render () {
    return (
      <div>
        <button onClick={() => this.sendColor('blue')}>Blue</button>
        <button onClick={() => this.sendColor('red')}>Red</button>
        <button onClick={() => this.sendColor('yellow')}>Yellow</button>
        <ul className="messages"></ul>
        <form className="chat-form" onSubmit={(e) => this.handleSubmit(e)}>
          <input className="m" autoComplete="off" onChange={this.handleChange}/><button>Send</button>
        </form>
      </div>
    )
  }
}

export default Chat;
