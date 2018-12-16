import React from 'react';
import {NavLink} from 'react-router-dom';
import Auth from '../auth';

class Navbar extends React.Component {

  render () {
    // Replace navbar with site title later
    return (
      <div className="navbar">
        <h1>Navbar</h1>
        <NavLink className="navlink" to="/" >Home</NavLink>
        <NavLink className="navlink" to="/users" >Users</NavLink>
        <Auth className="navlink"/>
      </div>
    )
  }
}

export default Navbar;
