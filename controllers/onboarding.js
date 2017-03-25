var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');


/**
 * POST /login
 */
/**
 * PUT /account
 * Update profile information OR change password.
 */
exports.accountPut = function(req, res, next) {
  if ('password' in req.body) {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirm', 'Passwords must match').equals(req.body.password);
  } else {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });
  }

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, function(err, user) {
    if ('password' in req.body) {
      user.password = req.body.password;
    } else {
      user.gender = req.body.gender;
      user.location = req.body.location;
      user.website = req.body.website;
      user.currentPay = req.body.currentPay;
      user.isSalary = req.body.isSalary;
      user.overtimeRate = req.body.overtimeRate;
      user.employer = req.body.overtime;
      user.position = req.body.position;
      user.age = req.body.age;
    }
    user.save(function(err) {
      if ('password' in req.body) {
        req.flash('success', { msg: 'Your password has been changed.' });
      } else if (err && err.code === 11000) {
        req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
      } else {
        req.flash('success', { msg: 'Your profile information has been updated.' });
      }
      res.redirect('/account');
    });
  });
};

exports.userOnboardingGet = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/forgot', {
    title: 'Log in'
  });
};