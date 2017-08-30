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
  const self = this;

  self.logout = () => {
    let err_ = null;
    brSessionService.logout().catch(err => {
      err_ = err;
    }).then(() => {
      if(angular.isDefined(self.onLogout)) {
        return self.onLogout({err: err_});
      }
      if(err_) {
        brAlertService.add('error', err_, {scope: $scope});
        return;
      }
      $location.url('/');
    });
  };
}
