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

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/login', function(req, res) {
    console.log(req.body.email);
    res.status(200).send({ auth: true, token: 'token', user: 'user' });
    // db.insert([
    //     req.body.name,
    //     req.body.email,
    //     bcrypt.hashSync(req.body.password, 8)
    // ],
    // function (err) {
    //     if (err) return res.status(500).send("There was a problem registering the user.")
    //     db.selectByEmail(req.body.email, (err,user) => {
    //         if (err) return res.status(500).send("There was a problem getting user")
    //         let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400 // expires in 24 hours
    //         });
    //         res.status(200).send({ auth: true, token: token, user: user });
    //     }); 
    // }); 
});

app.use(router);


const port = process.env.PORT || 8080;
app.listen(port);
