
const {
  getUserByUsername,
} = require('../../models/db.js');
const psw = require('../../libs/password');


const signIn = (req, res) => {
  const { username, password } = JSON.parse(req.body);

  getUserByUsername(username)
    .then(user => {
      if (!user) return res.json({ status: false, msg: 'Такого сочетания юзер/пароль нет' });

      const myUser = user.toJSON();

      if (psw.validPassword(myUser, password)) {
        myUser.access_token = '1';
        delete myUser.hash;
        delete myUser.salt;
        return res.json(myUser);
      }
      return res.json({ status: false, msg: 'Такого сочетания юзер/пароль нет' });
    })
    .catch(() => {
      res.json({ status: false, msg: 'Ошибка сервера' });
    });
};

module.exports = signIn;
