const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // add more documentation here later
  res.send('/api/users for user data')
})

module.exports = router;
