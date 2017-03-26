var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');
var moment = require('moment');



exports.getGroups = function(req, res) {
  res.render('groups', {
    title: 'Groups'
  });
};
