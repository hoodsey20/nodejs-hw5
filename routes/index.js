const express = require('express');
const router = express.Router();

const ctrl = require('../controllers');


router.all('*', ctrl.token);

router.post('/api/newNews', ctrl.newNews);
router.get('/api/getNews', ctrl.getNews);
router.delete('/api/deleteNews/:id', ctrl.deleteNews);
router.put('/api/updateNews/:id', ctrl.updateNews);

router.get('/api/getUsers', ctrl.getUsers);
router.post('/api/login', ctrl.login);
router.post('/api/saveNewUser', ctrl.saveNewUser);
router.put('/api/updateUser/:id', ctrl.updateUser);
router.post('/api/saveUserImage/:id', ctrl.saveUserImage);
router.delete('/api/deleteUser/:id', ctrl.deleteUser);
router.put('/api/updateUserPermission/:id', ctrl.updateUserPermission);


router.get('*', (req, res) => {
  res.render('index.html');
});


module.exports = router;
