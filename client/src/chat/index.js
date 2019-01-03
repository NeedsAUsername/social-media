import React from 'react';
import './chat.css';
import socketIOClient from "socket.io-client";
import ChatInput from './input.js';
import ChatJoinInput from './joinInput.js';
import userIcon from '../images/user.png';

// if production, connect to prod server. otherwise connect to localhost server
let host;
if (process.env.NODE_ENV === "production") {
  host = window.location.href
} else {
  host = "http://localhost:3000/"
}
// sock event listeners outside of class to prevent multiple event fires
// (otherwise it would create a new event listener for every re-render)
const socket = socketIOClient(host);
// dont want to activate events except on another page
if (window.location.href === host) {
  socket.on('users list', (usersList) => {
    let usersListElement = '';
    for (let i = 0; i < usersList.length; i++) {
      usersListElement += `<li>${usersList[i]}</li>`
    }
    document.querySelector('.users').innerHTML = usersListElement;
  })
  socket.on('send message', (user, text) => {
    let message = document.createElement('li');
    message.className="message";
    message.innerHTML = `
    <div class="user">
      <img class="usericon"
     src=${userIcon}
     alt="User Icon">
      <div>${user}</div>
    </div>   
      <div class="chatbubble">
        <div class="arrow-left"></div>
        <div class="content">${text}</div>
      </div>
      `;
    document.querySelector('.messages').appendChild(message);
    console.log(socket.id)
  })
  socket.on('join chat', (name) => {
    let message = document.createElement('li');
    message.textContent = name + ' has entered the room';
    document.querySelector('.messages').appendChild(message);
  })
}
class Chat extends React.Component {
  state = {
    joined: false,
    name: "Anonymous",
  }
  sendMessage = (message) => {
    socket.emit('send message', this.state.name.trim(), message)
    this.messagesEnd.scrollIntoView({block: 'end', behavior: 'smooth'})
  }
  joinChat = (name) => {
    socket.emit('join chat', name)
    this.messagesEnd.scrollIntoView({block: 'end', behavior: 'smooth'})
    this.setState({
      joined: true,
      name: name,
    })
  }
  render () {
    return (
      <main className="chat-container">
        <section className="messages-section">
          <h1>Chatroom</h1>
          <div className="messages-container" ref={(el) => { this.messagesContainer = el; }}>
            <div className="messages"></div>
            <div className="end" ref={(el) => { this.messagesEnd = el; }}></div>
          </div>
          <div className="input-container">
            {this.state.joined ? <ChatInput sendMessage={this.sendMessage}/> :
              <ChatJoinInput joinChat={this.joinChat} />}
          </div>
        </section>
        <section className="users-container">
          <h1>Online Users</h1>
          <div className="users"></div>
        </section>
      </main>
    )
  }
}

export default Chat;
