var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');

var User = require('../models/users');


router.use(function(req, res, next) {

    console.log(req.get('henkeltoken'));
    // console.log(req.headers);
    // console.log(req.header('henkeltoken'));

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.get('henkeltoken');
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {       
        if (err) {
            console.log(err);
          return res.json({ success: false, message: 'Failed to authenticate token.' });       
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;         
          next();
        }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  });

router.get('/token', function(req, res) {
    console.log('/token func');
    return res.status(200).send({ message: req.get('henkeltoken')});
});

module.exports = router;
