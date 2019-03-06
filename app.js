const express = require('express');
const morgan = require('morgan');

const app = express();
const config = require('./config.json');

app.use(morgan('dev'));

app.set('views', `${__dirname}/${config.staticPath}`);
app.engine('html', require('ejs').renderFile);

app.use(express.static(`${__dirname}/${config.staticPath}`));

app.use('/', require('./routes'));



const server = app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + server.address().port);
});
