/*!
 * Session Service.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory($http, config) {
  var service = {};

  service.get = function() {
    // FIXME: use url from config
    return Promise.resolve($http({method: 'GET', url: '/session'}))
      .then(function(response) {
        return response.data;
      });
  };

  return service;
}

return {brSessionService: factory};

});
