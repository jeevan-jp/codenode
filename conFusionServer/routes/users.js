var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var router = express.Router();
router.use(bodyParser.json());
router.post('/signup', (req, res, next) => {
  User.findOne({username: req.body.username})
    .then((user) => {
      if(user != null) {
        let err = new Error('User ' + req.body.username + ' is already registered!');
        err.status = 403;
        return next(err);
      } else {
        return User.create({
          username: req.body.username,
          password: req.body.password
        });
      }
    })
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ status: 'Registration Successful!', user: user });
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/login', (req, res, next) => {

  if(!req.session.user) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
      let err = new Error('You are not authenticated');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
  
    let auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    const userName = auth[0];
    const pass = auth[1];
    
    User.findOne({username: userName})
      .then((user) => {
        if(user === null) {
          let err = new Error('User' +  + 'does not exist')
          res.statusCode = 403;
          return next(err);
        } 
        else if(user.password !== pass) {
          let err = new Error('Incorrect password');
          res.statusCode = 403;
          return next(err);
        }
        else if(user.username === userName && user.password === user.password) {
          req.session.user = 'authenticated';
          req.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('You are authenticated!');
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  } 
  else {
    res.statusCode = 200;
    res.contentType('Content-Type', 'text/plain');
    res.end('You are already authenticated');
  }
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
