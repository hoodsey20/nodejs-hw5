const {
  getUserByUsername,
  createUser,
} = require('../../models/db.js');

const post = (req, res) => {
  const { username } = JSON.parse(req.body);

  getUserByUsername(username)
    .then(user => {
      if (user) {
        return res.json({ status: false, msg: 'Такой юзер уже существует' });
      }

      return createUser(JSON.parse(req.body));
    })
    .then(newUser => {
      console.log('newUser', newUser);

      res.json(newUser);
    })
    .catch((err) => res.json({ status: false, msg: err.message }));


};

module.exports = {
  post
};


