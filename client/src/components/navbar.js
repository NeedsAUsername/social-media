import React from 'react';
import {NavLink} from 'react-router-dom';
import Auth from '../auth';

class Navbar extends React.Component {
  current = () => ({
    borderBottom: 'solid',
    borderColor: 'grey',
  })
  renderNavLinks = () => (
    this.props.routes.map((route, index) => <li><NavLink key={index} className="navlink" to={route.path} exact activeStyle={this.current()}>{route.name}</NavLink></li>)
  )
  render () {
    // Replace navbar with site title later
    return (
      <nav className="navbar">
        <h1>Navbar</h1>
        <ul className="navlist">
          {this.renderNavLinks()}
        </ul>
        <Auth className="navlink"/>
      </nav>
    )
  }
}

export default Navbar;
