require('dotenv').config();
const express = require('express');
const server = express();
const router = require('./routes');
// To handle HTTP POST request in Express.js version 4 and above,
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
const bodyParser = require('body-parser');

// https://stackoverflow.com/questions/24988045/need-for-http-createserverapp-in-node-js-express
const http = require('http')
const socketServer = http.Server(server);
const io = require('socket.io')(socketServer);

require('./config/passport');

// support parsing of application/json type post data
server.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api', router);

io.on('connection', (socket) => {
  console.log('a user connected');
  // just like on the client side, we have a socket.on method that takes a callback function
  // once we get a 'send message' event from one of our clients, we will send it to the rest of the clients using emit
  socket.on('send message', (name, message) => {
    console.log('sending message: ' + message)
    io.sockets.emit('send message', name, message)
  })
  socket.on('join chat', (name) => {
    console.log(name + 'has joined the chat')
    io.sockets.emit('join chat', name)
  })
  socket.on('disconnect', () => {
    socket.removeAllListeners('send message');
    console.log('a user disconnected')
  })
})

const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {console.log('Express Server started on ' + PORT)});
socketServer.listen(PORT, () => {console.log('Socket Server started on ' + PORT)});
