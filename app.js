const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const cookieParser = require('cookie-parser');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);




const config = require('./config.json');
require('./models');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: 'key-secret',
    key: 'session-key',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    },
    saveUninitialized: false,
    resave: true,
    ephemeral: true,
    rolling: true,
  })
);

app.set('views', `${__dirname}/${config.staticPath}`);
app.engine('html', require('ejs').renderFile);

app.use(express.static(`${__dirname}/${config.staticPath}`, {index: false}));
require('./config-passport');
app.use(passport.initialize());
app.use(passport.session());

server.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + server.address().port);
});

const chatUsers = {};
io.on('connection', socket => {
  const userId = socket.id;
  const userName = socket.handshake.headers['username'];
  const userObj = {
    username: userName,
    id: userId
  };
  chatUsers[userId] = userObj;
  socket.broadcast.emit('new user', userObj);
  socket.emit('all users', chatUsers);

  socket.on('disconnect', () => {
    delete chatUsers[userId];

    socket.broadcast.emit('delete user', userId);
  });

  socket.on('chat message', (data, userId) => {
    if (userId !== socket.id) {
      io.sockets.connected[userId].emit('chat message', data, socket.id);
    }
  });
});

app.use('/', require('./routes'));

// error handler
app.use(function(err, req, res, next) {
  if (err) {
    res.status(500);
    res.json({ status: false, msg: `Ошибка: ${err.message}` });
  }
});
