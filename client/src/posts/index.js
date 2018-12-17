import React from 'react';
import {connect} from 'react-redux';
import './posts.css';

class Post extends React.Component {
  renderPosts = () => {
    let posts = [];
    for (let i = 0; i < this.props.posts.length; i++) {
      posts = posts.concat(this.props.posts[i])
    }
    return posts.map((post, index) =>
      <div key={index}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
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
    // posts: [[{postdata}, {postdata}], [{postdata}], [{postdata}]]
    posts: store.users.usersList.filter(user => user.posts).map(user => user.posts)
  }
}

export default connect(mapStateToProps)(Post);
