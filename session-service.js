/*!
 * Session Service.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
/* @ngInject */
export default function factory($http, brModelService) {
  var service = {};

  // empty session to start
  service.session = {};

  service.get = function() {
    // TODO: make URL configurable
    return Promise.resolve($http({method: 'GET', url: '/session', queue: true}))
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
