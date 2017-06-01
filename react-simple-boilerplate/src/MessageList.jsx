
import React from 'react';
import Message from './Message.jsx'

class MessageList extends React.Component {
  render() {
    return (
      <div className="message system">
      {this.props.messages.map((singleMsg, index) =>
        <Message key={singleMsg.username + index} username={singleMsg.username} content={singleMsg.content} />
      )
    }
      </div>
    )
  }
}


export default MessageList;