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

mongoose.connect('mongodb://localhost:27017/vue-henkel');

const db = mongoose.connection;

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: false }));

// router.post('/login', function(req, res) {
//     console.log(req.body.email);

//     res.status(200).send({ auth: true, token: 'token', user: 'user' });
//     // db.insert([
//     //     req.body.name,
//     //     req.body.email,
//     //     bcrypt.hashSync(req.body.password, 8)
//     // ],
//     // function (err) {
//     //     if (err) return res.status(500).send("There was a problem registering the user.")
//     //     db.selectByEmail(req.body.email, (err,user) => {
//     //         if (err) return res.status(500).send("There was a problem getting user")
//     //         let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400 // expires in 24 hours
//     //         });
//     //         res.status(200).send({ auth: true, token: token, user: user });
//     //     }); 
//     // }); 
// });

// ez itt egy uj comment


// router.post('/reg', function(req, res) {
//     console.log(req.body);

//     var user = new User();
//     user.email = 'na ez most egy email';

//     // User.create(req.body);
//     // user.save(function (err) {
//     //     if (err)
//     //         throw err;
//     //     return done(null, user);
//     // });

//     User.create(req.body.user, function (err, small) {
//         if (err) return handleError(err);
//         console.log('small');
//         console.log(small);

//         // saved!
//       });
//     res.status(200).send({ auth: true, token: 'token', user: 'user' });
//     // db.insert([
//     //     req.body.name,
//     //     req.body.email,
//     //     bcrypt.hashSync(req.body.password, 8)
//     // ],
//     // function (err) {
//     //     if (err) return res.status(500).send("There was a problem registering the user.")
//     //     db.selectByEmail(req.body.email, (err,user) => {
//     //         if (err) return res.status(500).send("There was a problem getting user")
//     //         let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400 // expires in 24 hours
//     //         });
//     //         res.status(200).send({ auth: true, token: token, user: user });
//     //     }); 
//     // }); 
// });

// app.use(router);

app.use('/', indexRouter);


const port = process.env.PORT || 8080;
app.listen(port);
