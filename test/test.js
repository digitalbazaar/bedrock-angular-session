/*
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
const config = bedrock.config;
const path = require('path');
require('bedrock-express');
require('bedrock-server');
require('bedrock-session-http');
require('bedrock-views');

const dir = path.join(__dirname);
// test pseudo package
config.views.system.packages.push({
  path: path.join(dir, 'components'),
  manifest: path.join(dir, 'package.json')
});

let user = null;

bedrock.events.on('bedrock-session-http.session.get', (req, session) => {
  if(user) {
    session.id = user.id;
  }
});

bedrock.events.on('bedrock-express.configure.routes', app => {
  app.post('/login', (req, res) => {
    user = {id: 'user123'};
    res.json(user);
  });

  app.get('/logout', (req, res) => {
    user = null;
    res.json({status: 'success'});
  });
});

bedrock.start();
