
const {
  getUserByUsername,
} = require('../../models/db.js');


const post = (req, res) => {
  const { username, password } = JSON.parse(req.body);

  getUserByUsername(username)
    .then(user => {
      if (!user) {
        return res.json({ status: false, msg: 'Такого юзера нет' });
      }
      const myUser = user.toJSON();
      myUser.id = myUser._id;
      myUser.access_token = '1';
      res.json(myUser);
    })
    .catch(() => res.json({ status: false, msg: 'Ошибка сервера' }));
};

module.exports = {
  post
};
