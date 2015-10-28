/*!
 * Session Service.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory($http, brModelService, config) {
  var service = {};

  // empty session to start
  service.session = {};

  service.get = function() {
    // FIXME: use url from config
    return Promise.resolve($http({method: 'GET', url: '/session'}))
      .then(function(response) {
        // update session in place
        brModelService.replace(service.session, response.data);
        return service.session;
      });
  };

  return service;
}

return {brSessionService: factory};

});
