var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');

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
      poop.moneyMade = poop.stopTime - poop.startTime; // calculation will go here
      user.poops[0] = poop;

      user.save(function(err) {
         console.log(err);
      });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(poop));
   });
}