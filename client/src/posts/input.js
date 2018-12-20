import React from 'react';

class PostInput extends React.Component {
  state = {
    userId: "5c15d22bf3e9631f9cb2d1e1",
    post: {
      title: "",
      content: ""
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createPost(this.state)
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      post: {
        ...this.state.post,
        [e.target.name]: e.target.value
      }
    })
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title" >Title</label>
          <input type="text" id="title" name="title" value={this.state.post.title} onChange={this.handleChange}/>
          <label htmlFor="content">Content</label>
          <input type="textbox" id="content" name="content" value={this.state.post.content} onChange={this.handleChange}/>
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default PostInput;
