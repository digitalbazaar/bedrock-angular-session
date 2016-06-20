/*!
 * Session module.
 *
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
define([
  'angular',
  './session-hovercard-component',
  './session-logout-component',
  './session-service'
], function(angular) {

'use strict';

var module = angular.module('bedrock.session', ['bedrock.resolver']);

Array.prototype.slice.call(arguments, 1).forEach(function(register) {
  register(module);
});

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

});
