const {
  getUsers,
} = require('../../models/db.js');

const get = (req, res) => {
  getUsers()
    .then(data => {
      res.json(data);
    })
    .catch(e => {
      res.status(500);
      res.json({ status: false, msg: `Ошибка сервера: ${e.message}` });
    });
};

module.exports = get;



