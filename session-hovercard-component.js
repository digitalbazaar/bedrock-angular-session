/*!
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

function register(module) {
  module.component('brSessionHovercard', {
    bindings: {
      label: '@brLabel',
      onSignOut: '&brOnSignOut',
      onRefresh: '&brOnRefresh'
    },
    controller: Ctrl,
    templateUrl: requirejs.toUrl(
      'bedrock-angular-session/session-hovercard-component.html'),
    transclude: {
      'contentSlot': '?brSessionHovercardContent',
      'modalSlot': '?brSessionHovercardModal'
    }
  });
}

/* @ngInject */
function Ctrl() {
  var self = this;
  self.hovercard = {
    show: false,
    triggerClicked: false
  };
}

return register;

});
