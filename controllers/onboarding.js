var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');



/**
 * PUT /welcome
 * Update profile information OR change password.
 */
exports.userOnboardingPut= function(req, res, next) {
   console.log('sub');
   User.findOne({ email: req.user.email }, function(err, user) {
      console.log(err);
      user.yearSalary = req.body.yearSalary;
      user.gender = req.body.gender;
      user.location = req.body.location;
      user.isSalary = req.body.isSalary;
      user.hrlyRate= req.body.hrlyRate;
      user.weeklyHours = req.weeklyHours;
      user.employer = req.body.employer;
      user.position = req.body.position;
      user.age = req.body.age;
      user.totalMade = 0;
      user.poops = [];

      user.save(function(err) {
         res.redirect('/');
         console.log(err);
         req.logIn(user, function(err) {

         });
      });
   });
};

exports.userOnboardingGet = function(req, res) {
   if (!req.user){
      res.redirect('/signup');
   }
   res.render('account/welcome', {
     title: 'Welcome'
   });
};
