const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.serializeUser(function(user, done) {
  console.log('Serialize: ', user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('Deserialize: ', id);
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
    {
      passReqToCallback: true,
    },
    function(req, username, password, done) {
      User.findOne({ username: username })
        .then(user => {
          if (!user) throw new Error('User not found');

          if (!user.validPassword(password)) {
            if (!user) throw new Error('Incorrect password');
          }
          return done(null, user);
        })
        .catch(err => done(err));
    }
  )
);

