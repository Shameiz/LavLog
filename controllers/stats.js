var async = require('async');
var crypto = require('crypto');
var User = require('../models/User');
var moment = require('moment');

/**
 * GET /
 */
exports.getUserStats = function(req, res) {
   //will be req.user.email
   User.findOne({ email: "lguerdan@yahoo.com" }, function(err, user) {
      var userStats = {}
      var prevPoop = user.poops[0];
      var duration = prevPoop.stopTime - prevPoop.startTime;
      userStats['prev_min'] = moment.duration(duration).minutes();
      userStats['prev_sec'] = moment.duration(duration).seconds();

      var timeStamp = Math.floor((new Date).getTime() / 1000);


      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(userStats));
   });
};