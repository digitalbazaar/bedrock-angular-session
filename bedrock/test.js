/*
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var config = bedrock.config;
var brPassport = require('bedrock-passport');
var LocalStrategy = require('passport-local').Strategy;
var passport = brPassport.passport;
var path = require('path');
var fs = require('fs');
require('bedrock-express');
require('bedrock-requirejs');
require('bedrock-server');
require('bedrock-session-rest');
require('bedrock-views');

var dir = path.join(__dirname, '..');
// bedrock-angular-session pseudo bower package
config.requirejs.bower.packages.push({
  path: dir,
  manifest: JSON.parse(fs.readFileSync(
    path.join(dir, 'bower.json'), {encoding: 'utf8'}))
});

// test pseudo bower package
config.requirejs.bower.packages.push({
  path: path.join(__dirname, 'components'),
  manifest: {
    name: 'bedrock-angular-session-test',
    moduleType: 'amd',
    main: './main.js',
    dependencies: {
      angular: '^1.3.0'
    }
  }
});

// returns the test user regardless of what username/password is used
passport.use(new LocalStrategy(function(username, password, done) {
    return done(null, {id: '1131235523', name: 'Bingo Bango'});
  }));

// put the user object into the session
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

// pull the user object out of the session
passport.deserializeUser(function(user, cb) {
  cb(null, user);
});

bedrock.events.on('bedrock-express.configure.routes', function(app) {

  app.post(
    '/login', passport.authenticate('local'), function(req, res, next) {
      res.json(req.user);
    });

  app.get('/logout', function(req, res) {
    if(req.isAuthenticated()) {
      req.logout();
      res.json({status: 'success'});
      return;
    }
    res.json({status: 'failure'});
  });
});

bedrock.start();
