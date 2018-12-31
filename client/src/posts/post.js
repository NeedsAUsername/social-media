import React from 'react';

class Post extends React.Component {
  render () {
    let post = this.props.post
    return (
      <div className="post">
        <div className="post-left">
          <h4>{post.user.name}</h4>
          <h5 className="date">{post.date.split(' ')[0]}</h5>
        </div>
        <div className="post-right">
          <h1 className="title">{post.title}</h1>
          <p className="content">{post.content}</p>
        </div>
      </div>
    )
  }
}

export default Post;
