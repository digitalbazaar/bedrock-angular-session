/*!
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';

export default {
  controller: Ctrl,
  bindings: {
    onLogout: '&?brOnLogout'
  },
  templateUrl: 'bedrock-angular-session/session-logout-component.html'
};

/* @ngInject */
function Ctrl($location, $scope, brAlertService, brSessionService) {
  var self = this;

  self.logout = function() {
    var err_ = null;
    brSessionService.logout().catch(function(err) {
      err_ = err;
    }).then(function() {
      if(angular.isDefined(self.onLogout)) {
        return self.onLogout({err: err_});
      }
      if(err_) {
        brAlertService.add('error', err_, {scope: $scope});
        $scope.$apply();
        return;
      }
      $location.url('/');
      $scope.$apply();
    });
  };
}
