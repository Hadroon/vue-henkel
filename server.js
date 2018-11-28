const express = require('express');
const serveStatic = require("serve-static");
const path = require('path');

var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');

var indexRouter = require('./back/routes/indexRouter');
var apiRouter = require('./back/routes/apiRouter');

mongoose.connect('mongodb://localhost:27017/vue-henkel');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/', apiRouter);
app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(history())
app.use(serveStatic(path.join(__dirname, 'dist')));

const port = process.env.PORT || 8080;
app.listen(port);
