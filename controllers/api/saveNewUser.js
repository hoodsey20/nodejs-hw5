const {
  getUserByUsername,
  createUser,
} = require('../../models/db.js');

const signUp = (req, res, next) => {
  const { username } = JSON.parse(req.body);

  getUserByUsername(username)
    .then(user => {
      if (user) {
        res.status(500);
        res.json({ status: false, msg: 'Такой юзер уже существует' });
        return;
      }

      return createUser(JSON.parse(req.body));
    })
    .then(newUser => res.json(newUser))
    .catch((err) => {
      next(err);
    });
};

module.exports = signUp;


