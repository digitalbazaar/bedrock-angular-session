import angular from 'angular';
import LoginController from './login-controller.js';

var module = angular.module('bedrock.session.login', []);

module.controller('brLoginController', LoginController);
