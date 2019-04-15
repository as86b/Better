/* Backend server */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {origins: 'http://localhost:3000'});

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

app.io = io;

// routes
const usersAPI = require('./routes/api/users');
const feedAPI = require('./routes/api/feed');
const messagesAPI = require('./routes/api/messages');
const loginAPI = require('./routes/api/login');
const registerAPI = require('./routes/api/register');
const uploadAPI = require('./routes/api/upload');
const postAPI = require('./routes/api/post');
app.use('/api/users', usersAPI);
app.use('/api/feed', feedAPI);
app.use('/api/messages', messagesAPI);
app.use('/api/login', loginAPI);
app.use('/api/register', registerAPI);
app.use('/api/upload', uploadAPI);
app.use('/api/post', postAPI);

// database
const db = require('./model/database');

// set port and launch server
const port = 4000;
server.listen(port, () => console.log('Server started on port ' + port));
