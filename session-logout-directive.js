/*!
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
define(['angular'], function(angular) {

'use strict';

/* @ngInject */
function factory($location, brAlertService, brSessionService) {
  return {
    restrict: 'E',
    scope: {
      callback: '&?brLogoutCallback'
    },
    templateUrl: requirejs.toUrl(
      'bedrock-angular-session/session-logout-directive.html'),
    link: Link
  };

  function Link(scope, elem, attrs) {
    var model = scope.model = {};

    model.logout = function() {
      var err_ = null;
      brSessionService.logout().catch(function(err) {
        err_ = err;
      }).then(function() {
        if(angular.isDefined(attrs.brLogoutCallback)) {
          return scope.callback({err: err_});
        }
        if(err_) {
          brAlertService.add('error', err_, {scope: scope});
          scope.$apply();
          return;
        }
        $location.url('/');
        scope.$apply();
      });
    };
  }
}

return {brSessionLogout: factory};

});
