import React from 'react';

class PostInput extends React.Component {
  state = {
    title: "",
    content: ""
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createPost(this.state);
    this.setState({
      title: "",
      content: ""
    })
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render () {
    return (
      <div className="post-form-container">
        <form className="post-form" onSubmit={this.handleSubmit}>
          <label htmlFor="title" >Title</label>
          <input className="input" type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange} required />
          <label htmlFor="content">Content</label>
          <textarea className="input" id="content" name="content" onChange={this.handleChange} required>{this.state.content}</textarea>
          <input className="button" type="submit" value="Post"/>
        </form>
      </div>
    )
  }
}

export default PostInput;
