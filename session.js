/*!
 * Session module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
define(['angular', './session-service'], function(angular, sessionService) {

'use strict';

var module = angular.module('bedrock.session', ['bedrock.resolver']);

module.service(sessionService);

/* @ngInject */
module.config(function(routeResolverProvider) {
  routeResolverProvider.add('session', resolve);

  /* @ngInject */
  function resolve($route, brSessionService) {
    if(!$route.current.session) {
      return false;
    }
    return brSessionService.get();
  }
});

return module.name;

});
