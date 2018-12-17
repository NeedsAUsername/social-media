require('dotenv').config();
const express = require('express');
const server = express();
const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
// To handle HTTP POST request in Express.js version 4 and above,
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
const bodyParser = require('body-parser');
// support parsing of application/json type post data
require('./config/passport');


server.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
server.use(bodyParser.urlencoded({ extended: true }));
server.use(homeRouter);
server.use(usersRouter);
server.use(postsRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {console.log('Express Server started on ' + PORT)});
