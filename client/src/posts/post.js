import React from 'react';

class Post extends React.Component {
  render () {
    let post = this.props.post
    return (
      <div>
        <h2>{post.title} - by: {post.user}</h2> 
        <p>{post.content}</p>
      </div>
    )
  }
}

export default Post;
