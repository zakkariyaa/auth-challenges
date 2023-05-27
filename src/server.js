const express = require('express');
const cookieParser = require('cookie-parser');
const home = require('./routes/home.js');
const signup = require('./routes/sign-up.js');
const login = require('./routes/log-in.js');
const logout = require('./routes/log-out.js');
const confessions = require('./routes/confessions.js');
require('dotenv').config();

const server = express();

const body = express.urlencoded({ extended: false });
server.use(cookieParser(process.env.COOKIE_SECRET));

server.use((req, res, next) => {
  const time = new Date().toLocaleTimeString('en-GB');
  console.log(`${time} ${req.method} ${req.url}`);
  next();
});

server.get('/', home.get);
server.get('/sign-up', signup.get);
server.post('/sign-up', body, signup.post);
server.get('/log-in', login.get);
server.post('/log-in', body, login.post);
server.post('/log-out', logout.post);
server.get('/confessions/:user_id', confessions.get);
server.post('/confessions/:user_id', body, confessions.post);

module.exports = server;
