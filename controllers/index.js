const login = require('./api/login.js');
const token = require('./api/token.js');
const saveNewUser = require('./api/saveNewUser.js');
const getNews = require('./api/getNews.js');
const updateUser = require('./api/updateUser.js');
const newNews = require('./api/newNews.js');
const deleteNews = require('./api/deleteNews.js');
const updateNews = require('./api/updateNews.js');
const saveUserImage = require('./api/saveUserImage.js');
const getUsers = require('./api/getUsers.js');
const deleteUser = require('./api/deleteUser.js');
const updateUserPermission = require('./api/updateUserPermission.js');


module.exports = {
  login,
  saveNewUser,
  getNews,
  updateUser,
  newNews,
  deleteNews,
  updateNews,
  saveUserImage,
  getUsers,
  deleteUser,
  updateUserPermission,
  token,
};
