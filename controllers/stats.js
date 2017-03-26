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
      var shortest = user.poops[0].seconds;
      var longest_made = user.poops[0].moneyMade;
      var shortest_made = user.poops[0].moneyMade;
      var earnings = 0;
      var total_secs = 0;

      for(var i = 0;  i < user.poops.length ; i++){
         if (user.poops[i].seconds > longest) {
            longest = user.poops[i].seconds;
            longest_made = user.poops[i].moneyMade;
         }
         if (user.poops[i].seconds < shortest){
            shortest = user.poops[i].seconds;
            shortest_made = user.poops[i].moneyMade;
         }
         if(user.poops[i].moneyMade){
            earnings += user.poops[i].moneyMade;
         }
         if(user.poops[i].seconds){
            console.log(user.poops[i].seconds.toFixed(2))
            total_secs += user.poops[i].seconds;
         }
      }

      userStats['longest_duration'] = longest;
      userStats['longest_made'] =  longest_made;
      userStats['shortest_duration'] = shortest;
      userStats['shortest_made'] =  shortest_made;
      userStats['total_made'] = parseFloat(earnings.toFixed(2));
      userStats['total_secs'] = total_secs;

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(userStats));
   });
};
