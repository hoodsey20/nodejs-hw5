const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./models/schemas/Users');


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return done(null, id);
  }

  User.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username })
        .then(user => {
          if (!user || !user.validPassword(password)) {
            throw new Error('Неправильные юзер / пароль');
          }
          return done(null, user);
        })
        .catch(err => done(err));
    }
  )
);

