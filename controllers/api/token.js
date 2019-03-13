const User = require('../../models/schemas/Users');

const token = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!!token) {
    User.findOne({ access_token: token })
      .then(user => {
        if (user) {
          req.logIn(user, err => {
            if (err) next(err);
            res.json(user);
          });
        }
        next();
      });
  } else {
    next();
  }
};

module.exports = token;
