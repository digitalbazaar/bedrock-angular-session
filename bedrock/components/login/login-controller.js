/* @ngInject */
export default function factory($scope, $http, brSessionService) {
  var self = this;
  self.username = null;
  self.password = null;
  self.session = null;

  self.submit = function() {
    Promise.resolve($http.post('/login', {
      username: self.username,
      password: self.password
    })).then(function() {
      self.check();
    }).catch(function(err) {
      console.log('ERROR', err);
    });
  };

  self.check = function() {
    Promise.resolve(brSessionService.get()).then(function(session) {
      self.session = session;
      $scope.$apply();
    });
  };

  self.logout = function() {
    Promise.resolve($http.get('/logout')).then(function() {
      self.check();
    });
  };

  self.check();
}
