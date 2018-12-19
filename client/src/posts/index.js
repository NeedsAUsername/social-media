import React from 'react';
import {connect} from 'react-redux';
import './posts.css';
import Post from './post.js'

class Posts extends React.Component {
  renderPosts = () => {
    return this.props.posts.map((post, index) =>
      <Post key={index} post={post}/>
    )
  }
  render () {
    return (
      <div>
        <h1>Posts Component</h1>
        <ul>
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  // our server has a posts index endpoint, but since we're loading users data on app load anyways, we can just filter that data using js to get all posts.
  return {
    posts: store.users.usersList.filter(user => user.posts).map(user => {
      let userPosts = user.posts.map(post => {
        return {...{user: {name: user.name, id: user._id}}, ...post}
      })
      return userPosts;
    }).flat()
  }
}

export default connect(mapStateToProps)(Posts);
