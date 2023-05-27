const express = require('express');
const cookieParser = require('cookie-parser');
const home = require('./routes/home.js');
const signup = require('./routes/sign-up.js');
const login = require('./routes/log-in.js');
const logout = require('./routes/log-out.js');
const confessions = require('./routes/confessions.js');
const { getSession, removeSession } = require('./model/session.js');
require('dotenv').config();

const server = express();

const body = express.urlencoded({ extended: false });
server.use(cookieParser(process.env.COOKIE_SECRET));

// log the time and req type
server.use((req, res, next) => {
  const time = new Date().toLocaleTimeString('en-GB');
  console.log(`${time} ${req.method} ${req.url}`);
  next();
});

// check session from cookie
server.use((req, res, next) => {
  const sessionId = req.signedCookies.sid;
  const session = getSession(sessionId);

  if (session) {
    const expiryDate = new Date(session.expires_at);
    const currentDate = new Date();

    if (currentDate > expiryDate) {
      removeSession(sid);
      res.clearCookie('sid');
    } else {
      req.session = session;
    }
  }

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
