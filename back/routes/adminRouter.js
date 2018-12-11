const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const config = require('../config');

var User = require('../models/users');
var Submission = require('../models/submission');

router.use(function(req, res, next) {
    var token = req.body.token || req.get('henkeltoken');
    if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {       
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });       
        } else {
          let isAdmin = decoded.roles.includes('admin');
          if (isAdmin) {
            req.decoded = decoded;   
            next();
          }
        }
      });
    } else {
      return res.status(404).send('Az oldal nem található.');
    }
  });

router.get('/getsubmissions', async (req, res) => {
    res.status(200).send({ submissions: 'Hello bello' });

});

  module.exports = router;
