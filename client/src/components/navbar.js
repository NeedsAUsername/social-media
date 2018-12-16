import React from 'react';
import {NavLink} from 'react-router-dom';
import Auth from '../auth';

class Navbar extends React.Component {
  current = () => ({
    borderBottom: 'solid',
    borderColor: 'grey',
  })
  renderNavLinks = () => (
    this.props.routes.map((route, index) => <NavLink key={index} className="navlink" to={route.path} exact activeStyle={this.current()}>{route.name}</NavLink>)
  )
  render () {
    // Replace navbar with site title later
    return (
      <div className="navbar">
        <h1>Navbar</h1>
        {this.renderNavLinks()}
        <Auth className="navlink"/>
      </div>
    )
  }
}

export default Navbar;
