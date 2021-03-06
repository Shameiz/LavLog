var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');
var moment = require('moment');

/**
 * GET /
 */
exports.getHome = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

/**
POST/ start timer
*/
exports.startPooping = function(req, res){

   User.findOne({ email: "lguerdan@yahoo.com" }, function(err, user) {

      var timeStamp = Math.floor((new Date).getTime() / 1000);
      poop = {
         startTime: timeStamp
      };
      user.poops.push(poop);

      user.save(function(err) {
         console.log(err);
      });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(poop));
  });
}

exports.stopPooping = function(req, res){
   //will be req.user.email
   User.findOne({ email: "lguerdan@yahoo.com" }, function(err, user) {

      var poop = user.poops[0];
      poop.seconds = req.body.time;

      var billed_seconds;
      if(user.isSalary == true){
         billed_seconds = user.hrlyRate / (52 * 40 * 60 * 60);
      }else{
         billed_seconds = (user.hrlyRate) / ( 60 * 60);
      }
      var money = (billed_seconds * poop.seconds);
      poop.moneyMade = money.toFixed(2);
      user.poops[0] = poop;
      user.totalMade += poop.moneyMade;
      user.poops.unshift(poop);

      user.save(function(err) {
         console.log(err);
      });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(poop));
   });
}