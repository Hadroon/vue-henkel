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

function objToArray(obj) {
  var result = Object.keys(obj).map(function(key) {
    return [key, obj[key]];
  });
  return result;
}

function counter(arr) {
  var a = [], b = [], prev;

  // arr.sort();
  let i = 0;
  for ( i; i < arr.length; i++ ) {
      if ( arr[i] !== prev ) {
          a.push(arr[i]);
          b.push(1);
      } else {
          b[b.length-1]++;
      }
      prev = arr[i];
  }

  return [a, b];
}

function fillConverter(arr) {
  let result = [];
  let dates = arr[0];
  let counts = arr[1];
  let i = 0;
  let date;
  let nextDate;
  let tomorrow;
  for ( i; i < arr.length;) {
    date = new Date(dates[i]);
    nextDate = dates[i + 1];
    tomorrow = date;
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow !== nextDate) {
      dates.splice(i+1, 0, tomorrow);
      counts.splice(i+1, 0, 0);
      console.log(i);
    } else {
      i++;
      console.log(i);
    }
  }

  result.push(dates);
  result.push(counts);
  return result;
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
  console.log('hello');
  try {
    let datas = [];
    let submissions = await Submission.find({});
    // console.log('original subb: ');
    // console.log(submissions);

    
    let purchaseData = {
      name: 'Vásárlások időpontja.'
    }
    
    let submissionData = {
      name: 'Beküldések időpontja.'
    }

    // let orderedSub = _.orderBy(submissions, ['dateOfSubmission'], ['asc'])
    
    let purchaseDatesObj = _.countBy(_.map(submissions, 'dateOfPurchase'), formatDate);
    let submissonDateObj = _.countBy(_.map(submissions, 'dateOfSubmission'), formatDate);

    // let purchaseStamps = _.map(submissions, 'dateOfPurchase');
    // let purchaseDates = purchaseStamps.map(formatDate).sort();
    // let counted = counter(purchaseDates);
    // let final = fillConverter(counted);


    // let purchaseDatesArr = _.orderBy(purchaseDatesObj, );
    // let submissionDatesArr = objToArray(submissonDateObj);

    purchaseData.data = purchaseDatesObj;
    submissionData.data = submissonDateObj;

    datas.push(purchaseData);
    datas.push(submissionData);


    
    console.log(datas);
    // console.log(submissionDatesArr);
    res.status(200).send({ datas: datas });
  } catch(err) {
    console.log(err);
    res.status(200).send({ submissions: 'Hello bello' });
  }
});

  module.exports = router;
