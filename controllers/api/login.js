
const {
  getUserByUsername,
} = require('../../models/db.js');


const signIn = (req, res) => {
  const { username, password } = JSON.parse(req.body);

  getUserByUsername(username)
    .then(user => {
      if (!user) throw new Error('Такого сочетания юзер/пароль нет');

      if (user.validPassword(password)) return res.json(user);

      throw new Error('Такого сочетания юзер/пароль нет');
    })
    .catch(e => {
      res.status(500);
      res.json({ status: false, msg: `Ошибка сервера: ${e.message}` });
    });
};

module.exports = signIn;
