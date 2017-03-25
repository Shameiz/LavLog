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

  // var errors = req.validationErrors();
   console.log(req.user);

  // console.log(req.body);
  // if (req.user) {
  //   return res.redirect('/account');
  // }



   // User.findOne({ email: req.body.email }, function(err, user) {
   //    if (user) {
   //       req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
   //       return res.redirect('/signup');
   //    }
   //    user = new User({
   //       name: req.body.name,
   //       email: req.body.email,
   //       password: req.body.password
   //    });
   //    user.save(function(err) {
   //       req.logIn(user, function(err) {
   //          res.redirect('/welcome');
   //       });
   //    });
   // });

  // User.findById(req.body.user.id, function(err, user) {
  //     // user.email = user.email;
  //     user.gender = req.body.gender;
  //     user.location = req.body.location;
  //     user.website = req.body.website;
  //     user.currentPay = req.body.currentPay;
  //     user.isSalary = req.body.isSalary;
  //     user.overtimeRate = req.body.overtimeRate;
  //     user.employer = req.body.overtime;
  //     user.position = "administrative assistant";
  //     user.age = 18;

  //   user.save(function(err) {
  //     if ('password' in req.body) {
  //       req.flash('success', { msg: 'Your password has been changed.' });
  //     } else if (err && err.code === 11000) {
  //       req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
  //     } else {
  //       req.flash('success', { msg: 'Your profile information has been updated.' });
  //       res.redirect('/yay');
  //     }
  //     res.redirect('/');
  //   });
  // });
};

exports.userOnboardingGet = function(req, res) {
  res.render('account/welcome', {
    title: 'Welcome'
  });
};
