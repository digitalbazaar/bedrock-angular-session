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
function factory($http, $sessionStorage, brModelService) {
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
   * Sets the active group for the session.
   *
   * @param group the group to set the active group to.
   *
   * @return true if the set was successful, false otherwise
   */
  service.setActiveGroup = function(group) {
    if(service.session.identity &&
      service.session.identity.memberOf &&
      service.session.identity.memberOf.length > 0) {
        if(service.session.identity.memberOf.indexOf(group) !== -1) {
          $sessionStorage.activeGroup = group;
          return true;
        }
      }
    return false;
  };

  /**
   * Gets the active group for the active session.
   *
   * @return a URL specifying the active group for the session.
   */
  service.getActiveGroup = function() {
    if(!$sessionStorage.activeGroup && service.session.identity &&
      service.session.identity.memberOf &&
      service.session.identity.memberOf.length > 0) {
          $sessionStorage.activeGroup = service.session.identity.memberOf[0];
      }
    return $sessionStorage.activeGroup;
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
      // unset the active group
      delete $sessionStorage.activeGroup;

      // refresh session, ignore error
      return service.get().catch(function() {});
    });
  };

  return service;
}

return register;

});
