const {
  deleteUser,
  getUsers,
} = require('../../models/db.js');

const deleteUserItem = (req, res) => {
  deleteUser(req.params.id)
    .then(() => getUsers())
    .then((newsData) => {
      res.json(newsData);
    })
    .catch(e => {
      res.status(500);
      res.json({ status: false, msg: `Ошибка сервера: ${e.message}` });
    });
};

module.exports = deleteUserItem;
