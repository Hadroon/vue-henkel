var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var RandomString = require('randomstring');
const jwt = require('jsonwebtoken');
var bcrypt   = require('bcrypt-nodejs');
const config = require('../config');

var User = require('../models/users');
// var verifyEmail = require('../controllers/emailVerify.js');


router.post('/reg', function (req, res) {

    const reqUser = req.body.user;
    // console.log(reqUser);
    // console.log('headers: ');
    // console.log(req.headers);

    var regexPatt = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    var isValidEmail = regexPatt.test(reqUser.email);
    if (!isValidEmail) {
        // return res.status(200).send({ auth: true, token: 'token', user: 'user' });
        return res.status(200).send({ error: 'A megadott email címmel már regisztráltak. Kérlek ellenőrizd vagy lépj be.' });
    }

    if (reqUser.password.length < 6 || reqUser.passwordTwo.length < 6) {
        return res.status(200).send({ error: 'A jelszónak legalább 6 karakter hosszúnak kell lennie.' });
    }

    if (reqUser.password !== reqUser.passwordTwo) {
        return res.status(200).send({ error: 'A jelszavaknak meg kell egyeznie.' });
    }

    if (reqUser.eula != true || reqUser.correctAge != true) {
        return res.status(200).send({ error: 'Az oldal használatához a szabályzatot és az adatvédelmi szabályzatot is el kell fogadni.' });
    }


    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function () {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        // User.findOne({ 'local.email': email }, function (err, user) {
        User.findOne({ 'email': reqUser.email }, function (err, user) {
            // if there are any errors, return the error
            if (err) {
                return done(err);
            }

            // check to see if theres already a user with that email
            if (user) {

                if (user.isEmailVerified === false) {
                    return res.status(200).send({ error: 'Email címedre aktíváló emailt küldtünk már. Kérünk aktíváld az email címedet' });
                }

                // ==========================================
                // TODO ha ide eljut akkor be kell léptetni
                // ===========================================
            } else {

                var newUserObject = new User(reqUser);

                newUserObject.password = newUserObject.generateHash(reqUser.password);
                newUserObject.passwordTwo = newUserObject.generateHash(reqUser.passwordTwo);
                newUserObject.registered = new Date();
                newUserObject.isEmailVerified = true;
                newUserObject.roles = ['user'];

                // console.log('ez a newUserObject: ');
                // console.log(newUserObject);
                
                // save the user
                newUserObject.save(function (err) {
                    if (err) throw err;
                    // console.log('save lementve: ');
                    // console.log('user id: ');
                    // console.log(newUserObject._id);
                    // return done(null, false, req.flash('signupMessage', 'Email címedre aktíváló levelet küldtünk.'));
                    // return res.status(200).send({ message: 'Email címedre aktíváló emailt küldtünk már. Kérünk aktíváld az email címedet' });
                    // let token = jwt.sign({ id: newUserObject._id, roles: newUserObject.roles }, config.secret, {expiresIn: 86400 });
                    res.status(200).send({ succesMessage: 'Email címedre aktíváló emailt küldtünk már. Kérünk aktíváld az email címedet' });
                });

                // User.create(rewUser, function (err, user) {
                //     if (err) throw err;

                //     var transporter = nodemailer.createTransport({
                //         service: 'gmail',
                //         auth: {
                //             user: 'gabor.muranyi@gmail.com',
                //             pass: 'jelszo0500'
                //         }
                //     });

                //     var mailOptions = {
                //         from: 'noreply@wangaru-interactive.com',
                //         to: email,
                //         subject: 'Aktíváló email',
                //         html: '<a href="http://localhost:8080/verify/' + newUser.local.emailVerificationToken + '" class="btn btn-default">Akíváláshoz kérlek kattints ide.</a>'
                //     };
    
                //     transporter.sendMail(mailOptions, function (error, info) {
                //         if (error) {
                //             console.log(error);
                //         } else {
                //             console.log('Email sent: ' + info.response);
                //         }
                //     });

                //   });

                // just testing
                // return res.status(200).send({ error: 'User crálva.' });

            }

        });

    });




            
    //  res.status(200).send({ auth: true, token: 'token', user: 'user' });
});

router.post('/login', function (req, res) {

    console.log('req.body');
    console.log(req.body);

    User.findOne({ 'email': req.body.email }, function (err, user) {
        // if there are any errors, return the error
        if (err) {
            throw err;
        }

        // check to see if theres already a user with that email
        if (user) {

            const passCrypt = bcrypt.compareSync(req.body.password, user.password);
            
            if (!passCrypt) {
                return res.status(200).send({ error: 'Nem megfelelő adatok.' });
            }

            if (user.isEmailVerified === false) {
                return res.status(200).send({ error: 'Email címedre aktíváló emailt küldtünk már. Kérünk aktíváld az email címedet' });
            }

            let token = jwt.sign({ id: user._id, roles: user.roles }, config.secret, {expiresIn: 86400 });
            res.status(200).send({ auth: true, token: token, user: user });



            // ==========================================
            // TODO ha ide eljut akkor be kell léptetni
            // ===========================================
        } else {
        }
    });

    router.get('/verif/:id', function(req, res) {
        console.log(req.params);
        res.setHeader('verif', 'almaszos');
        res.redirect('/');
    });

    });

module.exports = router;
