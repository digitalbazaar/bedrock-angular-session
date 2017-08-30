/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';

export default {
  controller: Ctrl,
  templateUrl: 'bedrock-angular-session-test/test-harness-component.html'
};

/* @ngInject */
function Ctrl($q, $scope, $http, brSessionService) {
  const self = this;
  self.username = null;
  self.password = null;
  self.session = null;

  self.$onInit = () => self.check();

  self.submit = () => {
    $http.post('/login', {username: self.username, password: self.password})
    .then(() => self.check())
    .catch((err) => {
      console.log('ERROR', err);
    });
  };

  self.check = function() {
    return brSessionService.get()
      .then(session => {
        self.session = session;
      });
  };

  self.logoutA = function() {
    $http.get('/logout').then(function() {
      return self.check();
    });
  };

  self.logoutB = () => $http.get('/logout').then(() => brSessionService.get())
    .then(session => {
      console.log('AAAAAAAAAAA', angular.version);
      console.log('SSSSSSSSSS', session);
      self.session = session;
      // $scope.$apply();
    });
}
