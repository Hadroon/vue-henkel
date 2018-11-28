var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var RandomString = require("randomstring");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt-nodejs");
const config = require("../config");

var User = require("../models/users");
// var verifyEmail = require('../controllers/emailVerify.js');

router.post("/reg", function(req, res) {
  const reqUser = req.body.user;

  var regexPatt = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  );
  var isValidEmail = regexPatt.test(reqUser.email);

  if (!isValidEmail) {
    // return res.status(200).send({ auth: true, token: 'token', user: 'user' });
    return res.status(200).send({
      error: "A megadott emailcím nem megfelelő formátumú. Kérlek ellenőrizd"
    });
  }


  if (!reqUser.password || !reqUser.passwordTwo) {
    return res.status(200).send({
      error: "Kérlek add meg jelszót."
    });
  }

  if (reqUser.password.length < 6 || reqUser.passwordTwo.length < 6) {
    return res.status(200).send({
      error: "A jelszónak legalább 6 karakter hosszúnak kell lennie."
    });
  }

  if (reqUser.password !== reqUser.passwordTwo) {
    return res.status(200).send({ error: "A jelszavaknak meg kell egyeznie." });
  }

  if (reqUser.eula != true || reqUser.correctAge != true) {
    return res.status(200).send({
      error:
        "Az oldal használatához a szabályzatot és az adatvédelmi szabályzatot is el kell fogadni."
    });
  }

  // asynchronous
  // User.findOne wont fire unless data is sent back
  process.nextTick(function() {
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    // User.findOne({ 'local.email': email }, function (err, user) {
    User.findOne({ email: reqUser.email }, function(err, user) {
      // if there are any errors, return the error
      if (err) {
        throw err;
      }

      // check to see if theres already a user with that email
      if (user) {
        if (user.isEmailVerified === false) {
          return res.status(200).send({
            error:
              "Email címedre aktíváló emailt küldtünk már. Kérünk aktíváld az email címedet"
          });
        }

        // ==========================================
        // TODO ha ide eljut akkor be kell léptetni
        // ===========================================
      } else {
        var newUserObject = new User(reqUser);

        newUserObject.password = newUserObject.generateHash(reqUser.password);
        newUserObject.passwordTwo = newUserObject.generateHash(
          reqUser.passwordTwo
        );
        newUserObject.registered = new Date();
        newUserObject.isEmailVerified = false;
        newUserObject.roles = ["user"];

        newUserObject.emailVerificationToken = RandomString.generate({
          length: 64
        });

        // console.log('ez a newUserObject: ');
        // console.log(newUserObject);

        // save the user
        newUserObject.save(function(err) {
          if (err) throw err;
          // return res.status(200).send({ message: 'Email címedre aktíváló emailt küldtünk már. Kérünk aktíváld az email címedet' });
          // let token = jwt.sign({ id: newUserObject._id, roles: newUserObject.roles }, config.secret, {expiresIn: 86400 });
          res.status(200).send({
            succesMessage:
              "Email címedre aktíváló emailt küldtünk már. Kérünk aktíváld az email címedet"
          });
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

router.post("/login", function(req, res) {

  if(!req.body.email || !req.body.password) {
    return res.status(200).send({ error: "Bejelentkezéshez add meg email címedet és jelszavad." });
  }

  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      return res.status(200).send({
        error:
          "Nem megfelelő adatok."
      });
    }

    if (user) {
      const passCrypt = bcrypt.compareSync(req.body.password, user.password);

      if (!passCrypt) {
        return res.status(200).send({ error: "Nem megfelelő adatok." });
      }

      if (user.isEmailVerified === false) {
        return res.status(200).send({
          error:
            "Email címedre aktíváló emailt küldtünk már. Kérünk aktíváld az email címedet."
        });
      }

      let token = jwt.sign({ id: user._id, roles: user.roles }, config.secret, {
        expiresIn: 86400
      });
      res.status(200).send({ auth: true, token: token, user: user });

    } else {
      return res.status(200).send({ error: "Hiba történt." });
    }
  });
});

router.get("/verif/:id", function(req, res) {
  User.findOne({ emailVerificationToken: req.params.id }, function(err, user) {
    if (err) {
      // throw err;
      return res.redirect("/#forms");
    }

    if (user) {
      user.isEmailVerified = true;
      user.save(function(err) {
        if (err) throw err;
        return res.redirect("/#forms");
      });
    }
  });

  res.redirect("/");
});

module.exports = router;
