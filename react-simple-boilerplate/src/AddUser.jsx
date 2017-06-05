import React from 'react';

class AddUser extends React.Component {
  render() {
    return (
      <main className="messages">
        <div className="message">
          <span className="message-username">{}</span>
          <span className="message-content">{this.props.notification}</span>
        </div>
      </main>
    )
  }
}

export default AddUser;
