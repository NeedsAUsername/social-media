# Notes
mlab notes:
  -with free version, we do not have access to certain commands(show dbs), and we only have access to one database.
  -use db.social-media in mongo shell
mongodb notes:
  -collections => SQL tables
  -docs => SQL entries

share node_module:
https://stackoverflow.com/questions/29786887/how-can-i-make-multiple-projects-share-node-modules-directory

production notes:
- make express serve static react build
<!-- server.use(express.static(path.join(__dirname, 'client/build'))) -->
- configure heroku to build in scripts
  - "heroku-postbuild": "cd client && npm install && npm run build"
- change start script back to node from nodemon
- set heroku var for env variables (like MONGO_URI)
- on React client side, make sure socket is listening to prod server
  - let host;
    if (process.env.NODE_ENV === "production") {
      host = window.location.href
    }
    const socket = socketIOClient(host);
https://medium.com/@chloechong.us/how-to-deploy-a-create-react-app-with-an-express-backend-to-heroku-32decfee6d18


NGROK NOTES:
we can use ngrok to expose our local server. https://dashboard.ngrok.com/get-started we need to download it first and move it to our users folder. Then we can run it from terminal root.
to start:
$ ./ngrok http 5000
ngrok will give us a random url to use
if there is an invalid host header use this:
$ ./ngrok http 5000 -host-header="localhost:5000"
to share the url and make changes across all computers, we also need to change the client socket in our React side to connect to the ngrok server.
const socket = socketIOClient('ngrok-url-here');
