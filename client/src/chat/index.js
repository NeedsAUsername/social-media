import React from 'react';
import './chat.css';
import socketIOClient from "socket.io-client";
import ChatInput from './input.js';
import ChatJoinInput from './joinInput.js';
import userIcon from '../images/user.png';
import Message from './message.js';

let host;
if (process.env.NODE_ENV === "production") {
  host = "https://social-media-sockets.herokuapp.com/"
} else {
  host = "http://localhost:3000/"
}
const socket = socketIOClient(host);

class Chat extends React.Component {
  state = {
    joined: false,
    name: "Anonymous",
    messageHistory: [],
    usersList: []
  }
  componentDidMount() {
    socket.on('users list', (usersList) => {
      this.setState({
        usersList: usersList
      })
    })
    socket.on('send message', (user, text) => {
      this.setState({
        messageHistory: [...this.state.messageHistory, {user, text, userIcon}]
      })
      this.scrolltoEnd();
    })
    socket.on('join chat', (name) => {
      if (document.querySelector('.messages')) {
        let message = document.createElement('li');
        message.className="announcement";
        message.textContent = name + ' has entered the room';
        document.querySelector('.messages').appendChild(message);
        this.scrolltoEnd();
      }
    })
  }
  scrolltoEnd = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({block: 'end', behavior: 'smooth'})
    }
  }
  sendMessage = (message) => {
    socket.emit('send message', this.state.name.trim(), message)
  }
  joinChat = (name) => {
    socket.emit('join chat', name)
    this.setState({
      joined: true,
      name: name,
    })
  }
  renderMessages = () => {
    return this.state.messageHistory.map(message => <Message messageInfo={message} />)
  }
  renderUsersList = () => {
    return this.state.usersList.map(user => <li>{user}</li>)
  }
  render () {

    return (
      <main className="chat-container" style={{display:"flex"}}>
        <section className="messages-section">
          <h1>Chatroom</h1>
          <div className="messages-container">
            <div className="messages">
              {this.state.joined ? this.renderMessages() : <ChatJoinInput joinChat={this.joinChat}/>}
            </div>
            <div className="end" ref={el => {this.messagesEnd = el}}></div>
          </div>
          <div className="input-container">
            {this.state.joined ? <ChatInput sendMessage={this.sendMessage}/> : null}
          </div>
        </section>
        <section className="users-container">
          <h1>Users In Chat</h1>
          <div className="users">{this.renderUsersList()}</div>
        </section>
      </main>
    )
  }
}

export default Chat;
