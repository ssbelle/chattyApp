import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'
import MessageList from './MessageList.jsx'
let server;



class App extends Component {
  //set initial state
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {username: 'Shawna'},
      messages: []
    };

    // binds the state-changing method to the parent component, in order to access its state and props
    this.addMessage = this.addMessage.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentDidMount() {
    server = new WebSocket("ws://localhost:3001/");
    server.onmessage = (event) => {
      const msgToScreen = JSON.parse(event.data);
      this.setState({
        currentUser: {username: this.state.currentUser.username},
        messages:this.state.messages.concat(msgToScreen)
      });
    }
  };

  addUser(user){
    this.setState({
      currentUser: {username: user}
    });
  }

  addMessage(newMessage) {
    const message = {
      username: this.state.currentUser.username,
      content: newMessage
    }
    //sends the object to the server
    server.send(JSON.stringify(message));
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.username} addMessage={this.addMessage} addUser={this.addUser} />
      </div>
    );
  }
}

export default App;
