const {
  getUserByUsername,
  createUser,
} = require('../../models/db.js');

const signUp = (req, res) => {
  const { username } = JSON.parse(req.body);

  getUserByUsername(username)
    .then(user => {
      if (user) {
        return res.json({ status: false, msg: 'Такой юзер уже существует' });
      }

      return createUser(JSON.parse(req.body));
    })
    .then(newUser => res.json(newUser))
    .catch((err) => {
      res.status(500);
      res.json({ status: false, msg: err.message });
    });
};

module.exports = signUp;


