import React from 'react';


class ChatBar extends React.Component {
  // submission handler, bound to ChatBar using the => at onKeyPress
  onMsgSubmission(event) {
    if(event.which === 13) {
      // passes the input's value to the parent's state-changing method
      this.props.addMessage(event.target.value);
      event.target.value = '';
    }
  }

  onUserSubmission(event){
    if(event.which === 13) {
      this.props.addUser(event.target.value);
    }
  }



  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyPress={(event) => this.onUserSubmission(event)} placeholder="Enter Name" defaultValue={this.props.currentUser}  />
        <input className="chatbar-message" onKeyPress={(event) => this.onMsgSubmission(event)} placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default ChatBar;

