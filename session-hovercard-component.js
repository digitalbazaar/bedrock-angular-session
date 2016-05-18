/*!
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

function register(module) {
  module.component('brSessionHovercard', {
    controller: Ctrl,
    templateUrl: requirejs.toUrl(
      'bedrock-angular-session/session-hovercard-component.html')
  });
}

/* @ngInject */
function Ctrl(
  $location, $scope, brAlertService, brRefreshService, brSessionService) {
  var self = this;
  self.loggedIn = false;
  self.identity = {};
  $scope.$watch(function() {
    return brSessionService.session.identity;
  }, function(identity) {
    self.loggedIn = !!identity;
    self.identity = identity;
  });

  self.logout = function() {
    var err_ = null;
    brSessionService.logout().catch(function(err) {
      err_ = err;
    }).then(function() {
      if(err_) {
        brAlertService.add('error', err_, {scope: $scope});
        $scope.$apply();
        return;
      }
      $location.url('/');
      $scope.$apply();
    });
  };

  self.refreshData = function() {
    brRefreshService.refresh();
  };

  // FIXME: refresh session data automatically elsewhere?
  brSessionService.get().catch(function() {}).then(function() {
    $scope.$apply();
  });
}

return register;

});
