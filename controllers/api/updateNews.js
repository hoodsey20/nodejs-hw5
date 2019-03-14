const find = require('lodash.find');

const {
  updateNews,
  getNews,
  findUsersMatchedById,
} = require('../../models/db.js');

const updateNewsData = (req, res) => {
  const id = req.params.id;
  const data = JSON.parse(req.body);
  let newsData;

  updateNews(id, data)
    .then(() => getNews())
    .then(data => {
      if (!data.length) {
        res.json(data);
        return;
      }

      const authors = [];
      newsData = data.map(item => item.toObject());
      newsData.forEach(item => {
        if (!authors.includes(item.user)) authors.push(item.user);
      });

      return findUsersMatchedById(authors);
    })
    .then(authors => {
      const authorsData = authors.map(item => item.toJSON());
      newsData.forEach(item => {
        const author = find(authorsData, { id: item.user });
        item.user = author;
      });
      res.json(newsData);
    })
    .catch(e => {
      res.status(500);
      res.json({ status: false, msg: `Ошибка сервера: ${e.message}` });
    });
};

module.exports = updateNewsData;
