const mongoose = require('mongoose');

const db = process.env.DB_PROD;

mongoose.Promise = global.Promise;

mongoose.connect(db, {
  useNewUrlParser: true,
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connection open ${db}`);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected app termination');
    process.exit(0);
  });
});
