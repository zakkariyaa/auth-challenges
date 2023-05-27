const {
  listConfessions,
  createConfession,
} = require('../model/confessions.js');
const { Layout } = require('../templates.js');

function get(req, res) {
  let userId = null;
  if (req.session) userId = req.session.user_id;
  const pageOwner = Number(req.params.user_id);

  const confessions = listConfessions(req.params.user_id);
  const title = 'Your secrets';
  const content = /*html*/ `
    <div class="Cover">
      <h1>${title}</h1>
      <form method="POST" class="Stack" style="--gap: 0.5rem">
        <textarea name="content" aria-label="your confession" rows="4" cols="30" style="resize: vertical"></textarea>
        <button class="Button">Confess 🤫</button>
      </form>
      <ul class="Center Stack">
        ${confessions
          .map(
            (entry) => `
            <li>
              <h2>${entry.created_at}</h2>
              <p>${entry.content}</p>
            </li>
            `
          )
          .join('')}
      </ul>
    </div>
  `;

  const body = Layout({ title, content });

  if (userId !== pageOwner) {
    res.status(401).send('Unauthorized access');
  } else {
    res.send(body);
  }
}

function post(req, res) {
  let userId = null;
  if (req.session) userId = req.session.user_id;

  if (!userId) {
    res.status(401).send('');
  } else {
    createConfession(req.body.content, userId);
    res.redirect(`/confessions/${userId}`);
  }
}

module.exports = { get, post };
