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

   //will be req.user.email
   User.findOne({ email: "lguerdan@yahoo.com" }, function(err, user) {

      var timeStamp = Math.floor((new Date).getTime() / 1000);
      console.log(user);
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

      var timeStamp = Math.floor((new Date).getTime() / 1000);
      var poop = user.poops[0];
      poop.stopTime = timeStamp;

      var duration = poop.stopTime - poop.startTime;
      var billed_seconds;

      if(user.isSalary == true){
         console.log('hit');
         billed_seconds = user.yearSalary / (51 * 40 * 60 * 60);
         billed_seconds = Math.round(billed_seconds * 100) / 100;
      }else{
         billed_seconds = (52 * user.hrlyRate * user.hrsPerWeek) / (51 * 40 * 60 * 60);
         billed_seconds = Math.round(billed_seconds * 100) / 100;
      }

      poop.moneyMade = (billed_seconds * moment.duration(duration).seconds());
      poop.seconds = (moment.duration(duration).seconds() % 60);
      poop.minutes = (moment.duration(duration).minutes());
      user.poops[0] = poop;

      user.totalSeconds += poop.seconds;
      user.totalMade += poop.moneyMade;

      user.save(function(err) {
         console.log(err);
      });
      console.log(poop);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(poop));
   });
}