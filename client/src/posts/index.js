import React from 'react';
import {connect} from 'react-redux';
import './posts.css';
import Post from './post';
import PostInput from './input';
import {createPost} from '../actions/posts/createPost';

class Posts extends React.Component {
  renderPosts = () => {
    let posts = this.props.users.filter(user => user.posts).map(user => {
      let userPosts = user.posts.map(post => {
        return {...{user: {name: user.name, id: user._id}}, ...post}
      })
      return userPosts;
    }).flat().sort((a, b) => {
      let aDate = new Date(a.date);
      let bDate = new Date(b.date);
      return aDate > bDate ? -1 : aDate < bDate ? 1 : 0
    })
    return posts.map((post, index) =>
      <Post key={index} post={post}/>
    )
  }
  createPost = (input) => {
    if (this.props.userId === "") {
      // for guest/anonymous posts
      this.props.createPost("guest", input)
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
    users: store.users.usersList
  }
}

export default connect(mapStateToProps, {createPost})(Posts);
