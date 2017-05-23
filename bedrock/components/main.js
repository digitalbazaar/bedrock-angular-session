/*!
 * Test components module.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
import angular from 'angular';
import './login/login';

var module = angular.module(
  'test.main', Array.prototype.slice.call(arguments, 1));

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Login',
      templateUrl: 'bedrock-angular-session-test/login/login.html'
    });
});
