const express = require('express');
const postsRouter = express.Router();
const User = require('../models/user');
const passport = require('passport');
const auth = require('./auth');

// url = '/api/posts/'
postsRouter.get('/', (req, res) => {
  User.find({posts: {$exists: true, $ne: []}})
  .then(users => users.map(user => {
    // let userPosts = user.posts.map(post => {return {...{user: user.name}, ...post}})
    return user.posts.map(post => {
      // can't just do {...post} because it'll give me a bunch of other properties
      let {_id, title, content} = post;
      return {...{user: {name: user.name, id: user._id}}, ...{_id, title, content}}
    });
  }))
  .then(posts => res.json(posts.flat()))
  .catch(err => res.status(500).json({error: err}))
})

// posts: store.users.usersList.filter(user => user.posts).map(user => {
//   let userPosts = user.posts.map(post => {return {...{user: user.name}, ...post}})
//   return userPosts
// create
postsRouter.post('/', (req, res) => {
  // req: {userId: 'userId', post: {postdata}}
  User.findByIdAndUpdate(req.body.userId, {$push: {posts: req.body.post}})
  .then(user => res.json(user.posts))
  .catch(err => res.status(500).json({error: err}))
})


module.exports = postsRouter;