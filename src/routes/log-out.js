const { removeSession } = require('../model/session');

function post(req, res) {
  let sessionId = null;
  if (req.session) sessionId = req.session.id;
  removeSession(sessionId);

  res.clearCookie('sid');
  res.status(500);
  res.redirect('/');
}

module.exports = { post };
