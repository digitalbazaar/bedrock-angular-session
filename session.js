/*!
 * Session module.
 *
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
define([
  'angular',
  './session-hovercard-directive',
  './session-logout-directive',
  './session-service'
], function(
  angular, sessionHovercardDirective, sessionLogoutDirective, sessionService) {

'use strict';

var module = angular.module('bedrock.session', ['bedrock.resolver']);

module.directive(sessionHovercardDirective);
module.directive(sessionLogoutDirective);
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
