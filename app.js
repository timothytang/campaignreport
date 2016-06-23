var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var portal = require('./routes/portal');
var users = require('./routes/users');
var comparisonPublisers = require('./routes/reports/comparePublishers.js');
var compaignAnalysis = require('./routes/reports/campaignAnalysis.js');
var campaignDaily = require('./routes/reports/campaignDaily.js');

var utils = require('./utils/utils');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/portal', portal);
app.use('/', portal);// TODO: to change to default index page.
app.use('/reports/comparePublishers', comparisonPublisers);
app.use('/reports/campaignAnalysis', compaignAnalysis);
app.use('/reports/campaignDaily', campaignDaily);

//我们的redshift是UTC时区，如果不设成一致的话 PG模块会有时区偏差。
process.env.TZ = 'UTC'
// app.get('/users/list',users.list);
app.listen(8080);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
