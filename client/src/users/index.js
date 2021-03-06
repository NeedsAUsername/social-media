import React from 'react';
import {connect} from 'react-redux';
import './users.css';

class Users extends React.Component {
  renderUsers = () => (this.props.users.map(user => <li key={user._id} className="list">Name: {user.name}, Email: {user.email}</li>)
  )

  render () {
    return (
      <div>
        <h1 className="title">Users Component</h1>
        <ul>
          Users: {this.renderUsers()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    users: store.users.usersList
  }
}
export default connect(mapStateToProps)(Users);
