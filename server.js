const express = require('express');
const serveStatic = require("serve-static");
const path = require('path');

var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

var indexRouter = require('./back/routes/indexRouter');
var apiRouter = require('./back/routes/apiRouter');

mongoose.connect('mongodb://localhost:27017/vue-henkel');

// const db = mongoose.connection;

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
// const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(router);

app.use('/', indexRouter);
app.use('/api/', apiRouter);


const port = process.env.PORT || 8080;
app.listen(port);
