import React from 'react';
import './chat.css';
import socketIOClient from "socket.io-client";

class Chat extends React.Component {
  state = {
    endpoint: 'http://localhost:5000',
    color: ""
  }

  // method for emitting a socket.io event
  send = (color) => {
    console.log('sending')
    const socket = socketIOClient(this.state.endpoint)
    // this emits an event to the socket (your server) with an argument of 'red'
    // you can make the argument any color you would like, or any kind of data you want to send.
    socket.emit('change color', color)
    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
  }
  render () {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('change color', (color) => {
      // setting the color of our button

      document.body.style.backgroundColor = color
    })
    return (
      <div>
        <button onClick={() => this.send('blue')}>Blue</button>
        <button onClick={() => this.send('red')}>Red</button>
        <button onClick={() => this.send('yellow')}>Yellow</button>
        <ul className="messages"></ul>
        <form className="chat-form" action="">
          <input className="m" autoComplete="off" /><button>Send</button>
        </form>
      </div>
    )
  }
}

export default Chat;
