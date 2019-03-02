import React from 'react';
import {NavLink} from 'react-router-dom';
import Auth from '../auth';

class Navbar extends React.Component {
  current = () => ({
    borderBottom: 'solid',
    borderColor: 'green',
    color: 'green'
  })
  renderNavLinks = () => (
    this.props.routes.map((route, index) => <li><NavLink key={index} className="navlink" to={route.path} exact activeStyle={this.current()}><span className="route-name">{route.name}</span><i className={route.icon}></i></NavLink></li>)
  )
  render () {
    return (
      <nav className="navbar">
        <h1>Chat'nPost<i class="far fa-comments"></i></h1>
        <ul className="navlist">
          {this.renderNavLinks()}
        </ul>
        <Auth className="navlink"/>
      </nav>
    )
  }
}

export default Navbar;
