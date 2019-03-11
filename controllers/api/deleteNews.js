const {
  deleteNews,
  getNews,
} = require('../../models/db.js');

const deleteItem = (req, res) => {
  deleteNews(req.params.id)
    .then(() => getNews())
    .then((newsData) => {
      res.json(newsData);
    })
    .catch(e => {
      res.json({ status: false, msg: `Ошибка сервера: ${e.message}` });
    });
};

module.exports = deleteItem;
