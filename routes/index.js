const express = require('express');
const router = express.Router();

const ctrl = require('../controllers');

router.post('/api/login', ctrl.login.post);
router.post('/api/saveNewUser', ctrl.saveNewUser.post);
router.get('/api/getNews', ctrl.getNews.get);
router.put('/api/updateUser/:id', ctrl.updateUser.put);


router.get('*', (req, res) => {
  res.render('index.html');
});


module.exports = router;
