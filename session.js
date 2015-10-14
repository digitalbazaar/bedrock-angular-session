/*!
 * Session module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
define(['angular', './session-service'], function(angular, sessionService) {

'use strict';

var module = angular.module('bedrock.session', []);

module.service(sessionService);

return module.name;

});
