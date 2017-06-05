import React from 'react';

class Message extends React.Component {
  render() {
    let username = this.props.username || 'Annonymous';

    return (
      <main className="messages">
        <div className="message">
          <span className="message-username">{username} says</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      </main>
    )
  }
}

export default Message;