/*!
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
define(['angular'], function(angular) {

'use strict';

/* @ngInject */
function factory($location, brRefreshService, brSessionService) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: requirejs.toUrl(
      'bedrock-angular-session/session-hovercard-directive.html'),
    link: Link
  };

  function Link(scope, elem, attrs) {
    var model = scope.model = {};
    model.loggedIn = false;
    model.identity = {};
    scope.$watch(function() {
      return brSessionService.session.identity;
    }, function(identity) {
      model.loggedIn = !!identity;
      model.identity = identity;
    });

    model.logout = function() {
      var err_ = null;
      brSessionService.logout().catch(function(err) {
        err_ = err;
      }).then(function() {
        if(err_) {
          brAlertService.add('error', err_, {scope: scope});
          scope.$apply();
          return;
        }
        $location.url('/');
        scope.$apply();
      });
    };

    model.refreshData = function() {
      brRefreshService.refresh();
    };

    // FIXME: refresh session data automatically elsewhere?
    brSessionService.get().catch(function() {}).then(function() {
      scope.$apply();
    });
  }
}

return {brSessionHovercard: factory};

});
