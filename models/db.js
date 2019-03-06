const { Users } = require('./schema');

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
    access_token: '1',
    username,
    firstName,
    middleName,
    surName,
    permission: {
      chat: {
        C: true,
        D: true,
        R: true,
        U: true,
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

  return User.save();
};
