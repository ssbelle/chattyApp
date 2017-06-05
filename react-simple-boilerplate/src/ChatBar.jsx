import React from 'react';
import { GithubPicker } from 'react-color';



class ChatBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickingColor: false,
      color: '#000'
    };
    this.colorPickerBtnHandler = this.colorPickerBtnHandler.bind(this);
    this.onColorSelect = this.onColorSelect.bind(this);
  }

  // submission handler, bound to ChatBar using the => at onKeyPress
  onMsgSubmission(event) {
    if(event.which === 13) {
      this.props.addMessage(event.target.value);
      event.target.value = '';
    }
  }

  onUserSubmission(event) {
    if(event.which === 13) {
      this.props.addUser(event.target.value);
    }
  }

  colorPickerBtnHandler() {
    this.setState({pickingColor: !this.state.pickingColor})
  }

  onColorSelect(color, event) {
    console.log(color)
    this.setState({color: color.hex});
  }

  render() {
    return (
      <footer className="chatbar">
        <div className="chatbar-left">
          <input className="chatbar-username"
                 onKeyPress={(event) => this.onUserSubmission(event)}
                 placeholder="Enter Name"
                 defaultValue={this.props.currentUser}
                 style={{color: this.state.color}} />
          <button
            className="chatbar-color-picker-btn"
            onClick={() => this.colorPickerBtnHandler()}>
            { this.state.pickingColor ?
              <GithubPicker
                triangle="top-left"
                onChangeComplete={(color) => this.onColorSelect(color)}/> :
              null
            }
          </button>
        </div>
        <div className="chatbar-right">
          <input className="chatbar-message" onKeyPress={(event) => this.onMsgSubmission(event)} placeholder="Type a message and hit ENTER" />
        </div>
      </footer>
    )
  }
}

export default ChatBar;

