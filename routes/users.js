const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user');
const passport = require('passport');
const auth = require('./auth');

// /api/users/
// index
usersRouter.get('/', (req, res) => {
  User.find()
  .then(doc => {
    res.json(doc);
  })
  .catch(err => res.status(500).json({error: err}))
})

// show. to be used for displaying other user's profile(name, email only)
usersRouter.get('/:id', (req, res) => {
  User.findById(req.params.id)
  .then(doc => {
    // change to name/email only later
    res.json(doc);
  })
  .catch(err => res.status(500).json({error: err}))
})


// get current user
// auth.required = needs JWT token in header (Authorization: Token enterTokenHere)
usersRouter.get('/current', auth.required, (req, res) => {
  // If authorized, req will have payload with user id.
  User.findById(req.payload.id)
  .then(doc => {
    if(!doc) {
      return res.status(400).json({error: 'User not found'})
    } else {
      return res.json(doc.toAuthJSON())
    }
  })
})

// login
// req should be: {user: {email: email, password: password}}
usersRouter.post('/login', (req, res) => {
  let user = req.body;
  passport.authenticate('local', {session: false}, (err, passportUser, info) => {
    if(err) {
      return res.json({error: err});
    }
    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return res.json(user.toAuthJSON());
    }
    return res.status(400).json({error: info});
  })(req, res);
})

// create/signup
usersRouter.post('/', (req, res) => {
  let user = req.body;
  if (!user) {
    return res.status(400).json({error: 'Request body is missing'});
  } else if (!user.password) {
    return res.status(400).send({error: 'Password needed'})
  }
  /* req.body will be something like:
    {name: "name", email: "email@email.com"}
  */
  let model = new User(user);
  model.setPassword(user.password);
  model.save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).json({error: 'user failed to save'});
      } else {
        // toAuthJSON gives user json with JWT token to include in header of future requests
        return res.status(201).json(model.toAuthJSON());
      }
    })
    .catch(err => {
      res.status(500).json({error: err});
    })
})




module.exports = usersRouter;
