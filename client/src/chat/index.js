import React from 'react';
import './chat.css';

class Chat extends React.Component {
  render () {
    return (
      <div>
        <ul class="messages"></ul>
        <form className="chat-form" action="">
          <input class="m" autocomplete="off" /><button>Send</button>
        </form>
      </div>
    )
  }
}

export default Chat;
