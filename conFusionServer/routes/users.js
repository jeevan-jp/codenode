var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var router = express.Router();
var passport = require('passport');
router.use(bodyParser.json());
router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
      if(err) {        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      } else {
        passport.authenticate('local')(req,res, () => {
          res.statusCode = 200;
          res.setHeader('Content-type', 'application/json');
          res.json({ success: true, status: 'Registration Successful', user: user});
        })
      }
    });
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-type', 'application/json');
  res.json({success: true, status: 'You are successfully logged in!'});
});

router.use('/logout', (req, res, next) => {
  if(req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    let err = new Error('You are not authenticated');
    err.statusCode = 403;
    return next(err);
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
