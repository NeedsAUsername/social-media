const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const postsRouter = require('./posts');

// /api
router.get('/', (req, res) => {
  // add more documentation here later
  res.send('/api/users for user data, /api/posts for posts data')
})

router.use('/users', usersRouter);
router.use('/posts', postsRouter)

module.exports = router;
