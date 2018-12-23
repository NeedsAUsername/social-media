const express = require('express');
const postsRouter = express.Router();
const User = require('../models/user');
const passport = require('passport');
const auth = require('./auth');

// url = '/api/posts/'
// index
postsRouter.get('/', (req, res) => {
  User.find({posts: {$exists: true, $ne: []}})
  .then(users => users.map(user => {
    return user.posts.map(post => {
      // can't just do {...post} because it'll give me a bunch of other properties
      let {_id, title, content} = post;
      // we want to add user info along with post info
      return {user: {name: user.name, id: user._id}, _id, title, content}
    });
  }))
  .then(posts => res.json(posts.flat()))
  .catch(err => res.status(500).json({error: err}))
})

// create
postsRouter.post('/', auth.required, (req, res) => {
  // req: {userId: 'userId', post: {postdata}}
  let today = new Date();
  let date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  let post = {...req.body.post, date: date}
  User.findByIdAndUpdate(req.body.userId, {$push: {posts: post}}, {new: true})
  .then(user => res.json(user))
  .catch(err => res.status(500).json({error: err}))
})

// create for guests(users not logged in), will be anonymous post)
postsRouter.post('/guest', (req, res) => {
  // req: {userId: 'userId', post: {postdata}}
  let today = new Date();
  let date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  let post = {...req.body.post, date: date}
  // Account that holds all anonymous posts
  User.findByIdAndUpdate('5c1c5c8ab659e24b82f4f7a8', {$push: {posts: post}}, {new: true})
  .then(user => res.json(user))
  .catch(err => res.status(500).json({error: err}))
})

module.exports = postsRouter;
