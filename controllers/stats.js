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
      var longest = user.poops[0].seconds;
      var earnings = 0;

      for(var i = 0;  i < user.poops.length ; i++){
         if (user.poops[i].seconds > longest) {
            longest = user.poops[i].seconds;
         }
         earnings += user.poops[i].moneyMade;
      }
      userStats['longest_duration'] = longest;
      userStats['total_made'] = earnings;


      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(userStats));
   });
};