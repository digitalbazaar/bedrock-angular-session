define([
  'angular',
  './login-controller'
],
function(angular, loginController) {

'use strict';

var module = angular.module('bedrock.session.login', []);

module.controller(loginController);

return module.name;

});
