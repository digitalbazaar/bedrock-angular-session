/*!
 * Test components module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([
  'angular',
  './login/login'
], function(angular) {

'use strict';

var module = angular.module(
  'test.main', Array.prototype.slice.call(arguments, 1));

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Login',
      templateUrl: requirejs.toUrl(
        'bedrock-angular-session-test/login/login.html')
    });
});

return module.name;

});
