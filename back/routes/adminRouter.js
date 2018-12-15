const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var _ = require('lodash');

const config = require('../config');
var User = require('../models/users');
var Submission = require('../models/submission');

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

router.use(function(req, res, next) {

// TODO: supercheck, security

    var token = req.body.token || req.get('henkeltoken');
    if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {       
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });       
        } else {
          let isAdmin = decoded.roles.includes('admin');
          if (isAdmin) {
            req.decoded = decoded;   
            return next();
          }
          return res.status(200).send({ error: 'Not found'});
        }
      });
    } else {
      return res.status(404).send('Az oldal nem található.');
    }
  });

router.get('/check', async (req, res) => {
  res.status(200).send({ isAdmin: true });
});

router.get('/getsubmissions', async (req, res) => {
  try {
    let submissions = await Submission.find({});

    let dateOfPurchaseArray = _.countBy(_.map(submissions, 'dateOfPurchase'), formatDate);

    console.log(dateOfPurchaseArray);
    res.status(200).send({ submissions: submissions });
  } catch(err) {
    res.status(200).send({ submissions: 'Hello bello' });
  }
});

  module.exports = router;
