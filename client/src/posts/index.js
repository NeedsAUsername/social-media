import React from 'react';
import {connect} from 'react-redux';
import './posts.css';
import Post from './post';
import PostInput from './input';
import {createPost} from '../actions/posts/createPost';

class Posts extends React.Component {
  renderPosts = () => {
    return this.props.posts.map((post, index) =>
      <Post key={index} post={post}/>
    )
  }
  createPost = (input) => {
    debugger
    if (this.props.userId === "") {
      // for guest/anonymous posts
      this.props.createPost("5c15d22bf3e9631f9cb2d1e1", input)
    } else {
      this.props.createPost(this.props.userId, input)
    }
  }
  render () {
    return (
      <div>
        <h1>Posts Component</h1>
        <PostInput createPost={this.createPost} />
        {this.renderPosts()}
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  // our server has a posts index endpoint, but since we're loading users data on app load anyways, we can just filter that data using js to get all posts.
  return {
    userId: store.currentUser._id,
    posts: store.users.usersList.filter(user => user.posts).map(user => {
      let userPosts = user.posts.map(post => {
        return {...{user: {name: user.name, id: user._id}}, ...post}
      })
      return userPosts;
    }).flat()
  }
}

export default connect(mapStateToProps, {createPost})(Posts);
