
import React from 'react';
import Message from './Message.jsx'
import AddUser from './AddUser.jsx'


class MessageList extends React.Component {

  render() {
    var messages = this.props.messages.map( message => {
      switch(message.type) {
        case 'incomingNotification':
          return <AddUser key={message.id} notification={message.content} addUser={this.props.addUser} />
          break;
        default:
          return <Message key={message.id} username={message.username} content={message.content}/>
      }
    })
    return (
      <div className='message system'>
        { messages }
      </div>
    )
  }
}


export default MessageList;