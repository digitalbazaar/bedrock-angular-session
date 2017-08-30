/*!
 * Test components module.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import TestHarnessComponent from './test-harness-component.js';

const module = angular.module('test.main', [
  'bedrock.form', 'bedrock.session', 'ngMaterial'
]);

bedrock.setRootModule(module);

module.component('brTestHarness', TestHarnessComponent);

/* @ngInject */
module.config($routeProvider => {
  $routeProvider
    .when('/', {
      title: 'Login',
      template: '<br-test-harness></br-test-harness>'
    });
});
