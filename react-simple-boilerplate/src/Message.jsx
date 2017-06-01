import React from 'react';

class Message extends React.Component {
  render() {
    let message = this.props;
    let username = message.username || 'Annonymous';
    return (
      <main className="messages">
        <div className="message" key={message.id}>
          <span className="message-username">{username} says</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      </main>
    )
  }
}

export default Message;