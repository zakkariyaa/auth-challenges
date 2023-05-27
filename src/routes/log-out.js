const { removeSession } = require('../model/session');

function post(req, res) {
  const sessionId = req.signedCookies.sid;
  removeSession(sessionId);

  res.clearCookie('sid');
  res.status(500);
  res.redirect('/');
}

module.exports = { post };
