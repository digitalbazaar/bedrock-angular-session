/*!
 * Session module.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';
import SessionHovercardComponent from './session-hovercard-component.js';
import SessionLogoutComponent from './session-logout-component.js';
import SessionService from './session-service.js';

var module = angular.module(
  'bedrock.session', ['bedrock.model', 'bedrock.resolver']);

module.component('brSessionHovercard', SessionHovercardComponent);
module.component('brSessionLogout', SessionLogoutComponent);
module.service('brSessionService', SessionService);

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
