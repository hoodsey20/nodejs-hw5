const {
  createNews,
} = require('../../models/db.js');


const addNews = (req, res) => {
  createNews(JSON.parse(req.body))
    .then(() => {
      res.redirect(301, '/api/getNews');
    })
    .catch(e => {
      res.status(500);
      res.json({ status: false, msg: `Ошибка сервера: ${e.message}` });
    });
};

module.exports = addNews;
