var express = require('express');
var router = express.Router();

var User = require('../models/user');
// var verifyEmail = require('../controllers/emailVerify.js');


router.post('/reg', function (req, res) {

    // console.log(req.body.user.email);

    // var user = new User();
    // user.email = 'na ez most egy email';

    // User.create(req.body.user, function (err, small) {
    //     if (err) return handleError(err);
    //     console.log('small');
    //     console.log(small);

    //     // saved!
    //   });


var regexPatt = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
var isValidEmail = regexPatt.test(req.body.user.email);
if (!isValidEmail) {
    // return done(null, false, req.flash('signupMessage', 'Kérlek ellenőrizd a megadott email címet.'));
    return res.status(500).send({ message: 'Kérlek ellenőrizd a megadott email címet.' });
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
            
            res.status(200).send({ auth: true, token: 'token', user: 'user' });
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
