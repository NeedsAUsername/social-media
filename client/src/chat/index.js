import React from 'react';
import './chat.css';
import socketIOClient from "socket.io-client";
import ChatInput from './input.js';
import ChatJoinInput from './joinInput.js';

// sock event listeners outside of class to prevent multiple event fires
// (otherwise it would create a new event listener for every re-render)
const socket = socketIOClient('http://localhost:5000');
socket.on('send message', (text) => {
  let mes = document.createElement('li');
  mes.textContent = text;
  document.querySelector('.messages').appendChild(mes);
})
socket.on('join chat', (name) => {
  let mes = document.createElement('li');
  mes.textContent = name + ' has entered the room';
  document.querySelector('.messages').appendChild(mes);
})

class Chat extends React.Component {
  state = {
    joined: false,
    name: "Anonymous"
  }
  sendMessage = (message) => {
    socket.emit('send message', message)
    this.messagesEnd.scrollIntoView({block: 'end', behavior: 'smooth'})
  }
  joinChat = (name) => {
    socket.emit('join chat', name)
    this.messagesEnd.scrollIntoView({block: 'end', behavior: 'smooth'})
    this.setState({
      joined: true,
      name: name
    })
  }
  render () {
    return (
      <div>
        <div className="messages-container" ref={(el) => { this.messagesContainer = el; }}>
          <ul className="messages"></ul>
          <div className="end" ref={(el) => { this.messagesEnd = el; }}></div>
        </div>
        {this.state.joined ? <ChatInput sendMessage={this.sendMessage}/> :
          <ChatJoinInput joinChat={this.joinChat} />}
      </div>
    )
  }
}

export default Chat;
