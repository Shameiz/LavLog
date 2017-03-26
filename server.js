var express = require('express');
var path = require('path');

var dotenv = require('dotenv');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var passport = require('passport');
var sass = require('node-sass-middleware');
var db = require('./db')

mongoose.connect(db.url)

// Load environment variables from .env file
dotenv.load();

// Controllers
var homeController = require('./controllers/home');
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
var onboardingController = require('./controllers/onboarding');
var statsController = require('./controllers/stats');
var groupsController = require('./controllers/groups');
// Passport OAuth strategies
require('./config/passport');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(sass({ src: path.join(__dirname, 'public'), dest: path.join(__dirname, 'public') }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));


app.get('/stats', statsController.getUserStats);

//home page with timer
app.get('/', homeController.getHome);
app.post('/', homeController.startPooping);
app.put('/', homeController.stopPooping);
// detailed registration
app.get('/welcome', onboardingController.userOnboardingGet);
// app.post('/welcome', onboardingController.userOnboardingPost);
app.put('/welcome', onboardingController.userOnboardingPut);

// routing contact page
app.get('/contact', contactController.contactGet);
app.post('/contact', contactController.contactPost);
// routing account
app.get('/account', userController.ensureAuthenticated, userController.accountGet);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
//routing signup
app.get('/signup', userController.signupGet);
app.post('/signup', userController.signupPost);
//login in
app.get('/login', userController.loginGet);
app.post('/login', userController.loginPost);
//reset password
app.get('/forgot', userController.forgotGet);
app.post('/forgot', userController.forgotPost);
app.get('/reset/:token', userController.resetGet);
app.post('/reset/:token', userController.resetPost);
// logout
app.get('/logout', userController.logout);

app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));
//profile route
app.get('/profile', userController.ensureAuthenticated,userController.getProfile);

app.get('/groups',groupsController.getGroups)
app.get('/groups/:id',groupsController.getOneGroup)

app.get('/groups',userController.ensureAuthenticated,groupsController.getGroups)


// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
