const {
  updateNews,
  getNews,
} = require('../../models/db.js');

const updateNewsData = (req, res) => {
  const id = req.params.id;
  const data = JSON.parse(req.body);
  updateNews(id, data)
    .then(() => getNews())
    .then((newsData) => {
      res.json(newsData);
    })
    .catch(e => {
      res.json({ status: false, msg: `Ошибка сервера: ${e.message}` });
    });
};

module.exports = updateNewsData;
