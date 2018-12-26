# Site Goals
- social media site where users can post things to a global board, and also to private boards(friends only, groups, etc.)
- real time chat with sockets.io
# Tech Used
- React, Express, MongoDB
# Setup
$ npm install

$ npm run client-install

create an .env file at root with the following (to access database):

MONGO_URI="//contributor:password1@ds229878.mlab.com:29878/social-media"


to start Express server:
$ npm run server

to start React server:
$ npm run client  

to start both servers:
$ npm run dev


to connect to mongo shell in terminal:


$ mongo ds229878.mlab.com:29878/social-media -u contributor -p password1


$ db.users.find()

# Current Goal:
- Build a basic site, with users able to create posts and see all posts.
- Add more functionality to the real-time chat(images, emojis, etc.)

# ToDos:
- In general: CSS for layout, buttons, input, etc.
- Style the chat with user's name.
- Enable use of emojis and pictures
- Add user is typing...
- Add user has joined the room, and user has left the room

- Create Nav-bar to go to below pages
Routes/Pages to create in React, with endpoints in Express API to fetch info:
- User Page('/user'): Should show user's posts, with options to edit/delete.
- Users('/users') index page: should link to show page of each user
- Account Page('/settings'): Should show user info(email, name), and options to edit/delete account

# Done So Far
- Connected React
- Connected MongoDB
- Set Up User Auth in Express with JWT and Passport
- Set Up User Authentication in React side
  - login/signup/logout forms working
  - stores token in local storage and include in header
  - fetches user on app mount if local storage has token
- Main Page('/'): All posts are shown, ordered by newest date first.
- Main Page has form to create a new post
  - if user is not logged in, will post from Anonymous account
- Connected socket.io
- Created basic real time chat
- Created production build for Heroku
