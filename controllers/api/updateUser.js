const {
  updateUser,
  getUserById,
} = require('../../models/db.js');

const updateUserData = (req, res) => {
  const data = JSON.parse(req.body);
  const { id, firstName, middleName, surName, password, oldPassword } = data;
  if (password && oldPassword) {
    getUserById(id)
      .then(user => {
        if (user.validPassword(oldPassword)) {
          user.setPassword(password);
          return user.save()
            .then(() => {
              return updateUser(id, {
                firstName,
                middleName,
                surName,
              });
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
