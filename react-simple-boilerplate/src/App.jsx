import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'
import MessageList from './MessageList.jsx'
import AddUser from './AddUser.jsx'
let server;


class App extends Component {
  //set initial state
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {username: 'shawna'},
      messages: []
    };

    // binds the state-changing method to the parent component, in order to access its state and props
    this.addMessage = this.addMessage.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentDidMount() {
    server = new WebSocket('ws://localhost:3001/');
    server.onmessage = (event) => {
      const msgToScreen = JSON.parse(event.data);

      if(msgToScreen.type === 'incomingCount') {
        this.setState({
          userCount: msgToScreen.count
        });
      } else {
        this.setState({
          messages:this.state.messages.concat(msgToScreen)
        });
      }
    }
  };


  addUser(username){
    const notification = {
      type: 'postNotification',
      user: this.state.currentUser.username,
      newUser: username,
      content: `${this.state.currentUser.username} changed their name to ${username}`
    }
    this.setState({
      currentUser:{username : username}
    })
    console.log(notification)

    server.send(JSON.stringify(notification));
  }


  addMessage(newMessage) {
    const message = {
      type: 'postMessage',
      username: this.state.currentUser.username,
      content: newMessage
    }
    server.send(JSON.stringify(message));
  }

  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages} addUser={this.addUser} />
        <ChatBar currentUser={this.state.currentUser.username} addMessage={this.addMessage} addUser={this.addUser} />
      </div>
    );
  }
}

export default App;
