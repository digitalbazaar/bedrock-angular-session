/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';

export default {
  controller: Ctrl,
  templateUrl: 'bedrock-angular-session-test/test-harness-component.html'
};

/* @ngInject */
function Ctrl($http, brSessionService) {
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

  self.check = () => brSessionService.get()
    .then(session => self.session = session);

  self.logout = () => $http.get('/logout').then(() => self.check());
}
