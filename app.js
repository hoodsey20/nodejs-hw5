const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const config = require('./config.json');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
// Mongoose connection for application
require('./models');
app.set('views', `${__dirname}/${config.staticPath}`);
app.engine('html', require('ejs').renderFile);

app.use(express.static(`${__dirname}/${config.staticPath}`, {index: false}));

app.use('/', require('./routes'));

const server = app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + server.address().port);
});
