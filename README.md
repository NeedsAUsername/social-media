# Site Summary
- social media site where users can post content
- real time chat with other online users
# Tech Used
- React, Express, MongoDB, socket.io
# Setup
$ npm install

$ npm run client-install

create an .env file at root with the following (to access database):

MONGO_URI="//contributor:password1@ds229878.mlab.com:29878/social-media"

ANONYMOUS_ACCOUNT_ID="5c1c5c8ab659e24b82f4f7a8"


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
- Add more functionality to the real-time chat(images, emojis, etc.)
- Add more functionality to the site (other REST actions for users and posts)

# ToDos:
- In general: more CSS
- Enable use of emojis and pictures(for both chat and posts)
- Add user is typing...

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
  - Integrated sockets into React Component
  - Real time chat
  - Chat room updates even while user is on a different route (only refresh clears chat)
  - Dynamic list of online users
- All-custom Layout and Styling of Home and Post pages
- Production build for Heroku
