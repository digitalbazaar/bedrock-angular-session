/*!
 * Session Service.
 *
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

function register(module) {
  module.service('brSessionService', factory);
}

/* @ngInject */
function factory($http, brModelService, config) {
  var service = {};

  // empty session to start
  service.session = {};

  service.get = function() {
    // TODO: make URL configurable
    return Promise.resolve($http({method: 'GET', url: '/session'}))
      .then(function(response) {
        // update session in place
        brModelService.replace(service.session, response.data);
        return service.session;
      });
  };

  /**
   * Logs out any identity that currently has an authenticated session.
   *
   * @return a Promise that resolves once the logout has finished.
   */
  service.logout = function() {
    // TODO: make URL configurable
    return Promise.resolve($http.get('/session/logout')).then(function(res) {
      if(res.status !== 200) {
        throw new Error('Logout failed.');
      }
      // refresh session, ignore error
      return service.get().catch(function() {});
    });
  };

  return service;
}

return register;

});
