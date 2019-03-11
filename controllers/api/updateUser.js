const {
  updateUser,
  getUserById,
} = require('../../models/db.js');
const psw = require('../../libs/password');

const updateUserData = (req, res) => {
  const data = JSON.parse(req.body);
  const { id, firstName, middleName, surName, password, oldPassword } = data;
  if (password && oldPassword) {
    getUserById(id)
      .then(user => {
        const myUser = user.toObject();
        if (psw.validPassword(myUser, oldPassword)) {
          const pass = psw.setPassword(password);
          const hash = pass.hash;
          const salt = pass.salt;
          return updateUser(id, {
            firstName,
            middleName,
            surName,
            hash,
            salt,
          });
        } else {
          throw new Error('Текущий пароль указан неверно');
        }
      })
      .then(updatedData => {
        res.json(updatedData);
      })
      .catch(e => {
        res.status(500);
        res.json({ status: false, msg: e.message });
      });
  } else {
    updateUser(id, { firstName, middleName, surName })
      .then(updatedData => {
        res.json(updatedData);
      })
      .catch(e => {
        res.status(500);
        res.json({ status: false, msg: e.message });
      });
  }
};

module.exports = updateUserData;
