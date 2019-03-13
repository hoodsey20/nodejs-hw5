const passport = require('passport');
const uuidv4 = require('uuid/v4');

const signIn = (req, res, next) => {
  req.body = JSON.parse(req.body);
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return next(new Error('неправильные логин/пароль'));

    req.logIn(user, err => {
      if (err) return next(err);

      if (req.body.remembered) {
        const token = uuidv4();
        user.setToken(token);
        user.save()
          .then(user => {
            res.cookie('token', token, {
              maxAge: 7 * 60 * 60 * 1000,
              path: '/',
              httpOnly: true,
            });
            return res.json(user);
          })
          .catch(e => next(e));
      } else {
        return res.json(user);
      }
    });
  })(req, res, next);
};

module.exports = signIn;
