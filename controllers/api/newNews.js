const {
  createNews,
  getNews,
} = require('../../models/db.js');


const addNews = (req, res) => {
  createNews(JSON.parse(req.body))
    .then(() => getNews())
    .then((newsData) => {
			console.log('TCL: post -> newsData', newsData)
      res.json(newsData);
    })
    .catch(e => {
      res.status(500);
      res.json({ status: false, msg: `Ошибка сервера: ${e.message}` });
    });
};

module.exports = addNews;
