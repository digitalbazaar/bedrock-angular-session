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

  // TODO: add another check to redirect if $route.current.session
  routeResolverProvider.add('bedrock-idp', 'session', resolve2);
  /* @ngInject */
  function resolve2($window, $route) {
    // return early if session is present
    var session = $route.current.locals.session;
    if(session && session.identity) {
      return;
    }

    // if route requires a session, redirect to login
    if($route.current.session === 'required') {
      // TODO: redirect to route info or '/' by default
      // FIXME: use $location only once any SPA state issues are resolved
      $window.location.href = '/session/login';
      throw new Error('Not authenticated.');
    }
  }
});

/* @ngInject */
module.run(function(
  $location, $rootScope, $route, $window, config, util) {
  // FIXME: remove `locationChangeStart` (everything below; replaced with
  // route resolver above) once `queuedRequest` no longer supported

  // do immediate initial location change prior to loading any page content
  // in case a redirect is necessary
  locationChangeStart();

  $rootScope.$on('$locationChangeStart', locationChangeStart);

  function locationChangeStart(event) {
    // session auth check
    var authenticated = !!config.data.idp.session.identity;
    if(authenticated) {
      return;
    }

    // if the current path is a route that requires authentication,
    // redirect to login
    var route = util.getRouteFromPath($route, $location.path());
    if(route && route.session === 'required') {
      if(event) {
        event.preventDefault();
      }
      $window.location.href = '/session/login';
    }
  }
});

});
