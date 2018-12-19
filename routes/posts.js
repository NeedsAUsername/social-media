const express = require('express');
const postsRouter = express.Router();
const User = require('../models/user');
const passport = require('passport');
const auth = require('./auth');

// url = '/api/posts/'
postsRouter.get('/', (req, res) => {
  User.find({posts: {$exists: true, $ne: []}})
  .then(user => user.map(user => user.posts))
  .then(posts => res.json(posts.flat()))
  .catch(err => res.status(500).json({error: err}))
})

// create
postsRouter.post('/', (req, res) => {
  // req: {userId: 'userId', post: {postdata}}
  User.findByIdAndUpdate(req.body.userId, {$push: {posts: req.body.post}})
  .then(user => res.json(user.posts))
  .catch(err => res.status(500).json({error: err}))
})


module.exports = postsRouter;
