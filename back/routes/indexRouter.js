var express = require('express');
var router = express.Router();

var User = require('../models/user');
// var verifyEmail = require('../controllers/emailVerify.js');


router.post('/reg', function (req, res) {

    const reqUser = req.body.user;

    var regexPatt = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    var isValidEmail = regexPatt.test(reqUser.email);
    if (!isValidEmail) {
        // return done(null, false, req.flash('signupMessage', 'Kérlek ellenőrizd a megadott email címet.'));
        return res.status(200).send({ auth: true, token: 'token', user: 'user' });
    }

    if (password.length < 6) {
        return done(null, false, req.flash('signupMessage', 'A jelszónak legalább 6 karakter hosszúnak kell lennie.'));
    }

    if (password !== req.body.passwordtwo) {
        return done(null, false, req.flash('signupMessage', 'A jelszavaknak meg kell egyeznie.'));
    }

    if (req.body.eula != 1 || req.body.gdpr != 1) {
        return done(null, false, req.flash('signupMessage', 'Az oldal használatához a szabályzatot és'
            + 'az adatvédelmi szabályzatot is el kell fogadni.'));
    }


    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function () {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        // User.findOne({ 'local.email': email }, function (err, user) {
        User.findOne({ $or: [{ 'local.email': email }, { 'google.email': email }] }, function (err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {

                if (user.local.isEmailVerified === false) {
                    return done(null, false, req.flash('signupMessage', 'Email címedre aktíváló emailt küldtünk. Kérünk aktíváld az email címedet'));
                }

                // if already registered with google, just updating the user
                if (user.google.email == email) {
                    //var newUser = new User();

                    // set the user's local credentials
                    user.local.email = email;
                    user.local.password = user.generateHash(password);

                    // save the user
                    user.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                } else {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                }
            } else {

                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.local.isEmailVerified = false;
                newUser.local.emailVerificationToken = RandomString.generate({
                    length: 64
                });
                var date = new Date();
                date.setHours(date.getHours() + 2);
                newUser.local.registered = date;
                newUser.local.eula = true;
                newUser.local.gdpr = true;
                

                // save the user
                newUser.save(function (err) {
                    if (err)
                        throw err;
                    // return done(null, newUser);
                    return done(null, false, req.flash('signupMessage', 'Email címedre aktíváló levelet küldtünk.'));
                });

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'gabor.muranyi@gmail.com',
                        pass: config.all.gpass
                    }
                });

                var mailOptions = {
                    from: 'noreply@wangaru-interactive.com',
                    to: email,
                    subject: 'Aktíváló email',
                    html: '<a href="http://localhost:8080/verify/' + newUser.local.emailVerificationToken + '" class="btn btn-default">Akíváláshoz kérlek kattints ide.</a>'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });



            }

        });

    });




            
    //  res.status(200).send({ auth: true, token: 'token', user: 'user' });
});

router.post('/login', function (req, res) {

    var regexPatt = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    var isValidEmail = regexPatt.test(email);
    if (!isValidEmail) {
        return done(null, false, req.flash('signupMessage', 'Kérlek ellenőrizd a megadott email címet.'));
    }
    
    if (password.length < 6) {
        return done(null, false, req.flash('signupMessage', 'A jelszónak legalább 6 karakter hosszúnak kell lennie.'));
    }
    
    if (password !== req.body.passwordtwo) {
        return done(null, false, req.flash('signupMessage', 'A jelszavaknak meg kell egyeznie.'));
    }
    
    if (req.body.eula != 1 || req.body.gdpr != 1) {
        return done(null, false, req.flash('signupMessage', 'Az oldal használatához a szabályzatot és'
            + 'az adatvédelmi szabályzatot is el kell fogadni.'));
    }
    
    });

module.exports = router;
