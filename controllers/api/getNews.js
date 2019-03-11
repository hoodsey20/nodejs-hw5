const {
  getNews,
} = require('../../models/db.js');

const get = (req, res) => {
  getNews()
    .then(data => {
      if (!data.length) return res.json(data);
			console.log('TCL: get -> news', data);
      res.json(data);
    })
    .catch(e => {
      res.json({ status: false, msg: `Ошибка сервера: ${e.message}` });
    });
};

module.exports = get;

