
import React from 'react';


class NavBar extends React.Component {
  render() {
    return (
      <nav className='navbar'>
       <a href='/' className='navbar-brand'>Chatty</a>
       <div className='user-counter'>{`${this.props.userCount} users online`}</div>
      </nav>
    )
  }
}

export default NavBar;