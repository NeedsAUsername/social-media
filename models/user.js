const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

mongoose.set('useCreateIndex', true);
let MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/social"
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

let PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})
let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  posts: {
    type: [PostSchema]
  },
  // user's password will be converted into hash and salt
  hash: String,
  salt: String
})

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

// this will be sent to client on successful auth
UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    name: this.name,
    token: this.generateJWT(),
  };
};

let User = mongoose.model('User', UserSchema);
module.exports = User;
