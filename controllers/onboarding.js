var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');


/**
 * POST /login
 */
exports.userOnboardingPost = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', function(err, user, info) {
    if (!user) {
      req.flash('error', info);
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      res.redirect('/');
    });
  })(req, res, next);
};

exports.userOnboardingGet = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }


  res.render('account/welcome', {
    title: 'Welcome'
  });
};
