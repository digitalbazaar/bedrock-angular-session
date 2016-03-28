/*
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var config = bedrock.config;
var path = require('path');
var fs = require('fs');
require('bedrock-express');
require('bedrock-requirejs');
require('bedrock-server');
require('bedrock-session-http');
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

var user = null;

bedrock.events.on('bedrock-session-http.session.get', function(req, session) {
  if(user) {
    session.id = user.id;
  }
});

bedrock.events.on('bedrock-express.configure.routes', function(app) {
  app.post('/login', function(req, res) {
    user = {id: 'user123'};
    res.json(user);
  });

  app.get('/logout', function(req, res) {
    user = null;
    res.json({status: 'success'});
  });
});

bedrock.start();
