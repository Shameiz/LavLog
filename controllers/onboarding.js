var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');



/**
 * PUT /account
 * Update profile information OR change password.
 */
exports.userOnboardingPut = function(req, res, next) {
   User.findOne({ email: req.user.email }, function(err, user) {

      user.yearSalary = req.body.yearSalary;
      user.gender = req.body.gender;
      user.location = req.body.location;
      user.isSalary = req.body.isSalary;
      user.hrlyRate= req.body.hrlyRate;
      user.yearSalary = req.body.yearSalary;
      user.hrsPerWeek = req.hrsPerWeek;
      user.employer = req.body.employer;
      user.position = req.body.position;
      user.age = req.body.age;
      user.poops = [];

      user.save(function(err) {
         req.logIn(user, function(err) {
            res.redirect('/');
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
