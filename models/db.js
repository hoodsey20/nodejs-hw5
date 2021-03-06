const { Users, News } = require('./schema');

module.exports.deleteNews = function(id) {
  return News.findByIdAndRemove({ _id: id });
};

module.exports.updateNews = function(id, data) {
  const { date, text, theme, userId } = data;
  return News.findOneAndUpdate({ _id: id }, { date, text, theme, user: userId });
};

module.exports.createNews = function(data) {
  const { date, text, theme, userId } = data;

  const NewsItem = new News({
    date,
    text,
    user: userId,
    theme,
  });

  return NewsItem.save();
};

module.exports.getNews = function() {
  return News.find();
};

module.exports.getUsers = function() {
  return Users.find();
};

module.exports.getUserById = function(id) {
  return Users.findOne({ _id: id });
};

module.exports.getUserByUsername = function(name) {
  return Users.findOne({ username: name });
};

module.exports.createUser = function(data) {
  const { username, firstName, middleName, surName, password } = data;

  const User = new Users({
    access_token: 'empty',
    username,
    firstName,
    middleName,
    surName,
    permission: {
      chat: {
        C: false,
        D: false,
        R: true,
        U: false,
      },
      news: {
        C: false,
        D: false,
        R: true,
        U: false,
      },
      setting: {
        C: false,
        D: false,
        R: true,
        U: false,
      },
    }
  });

  User.setPassword(password);

  return User.save();
};

module.exports.updateUser = function(id, data) {
  Object.keys(data).forEach(item => {
    if (data[item] === undefined) delete data[item];
  });
  return Users.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
};

module.exports.deleteUser = function (id) {
  return Users.findOneAndRemove({ _id: id });
};

module.exports.findUsersMatchedById = function (ids) {
  return Users.find({ _id: { $in: ids } });
};
