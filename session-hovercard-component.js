/*!
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  bindings: {
    label: '@brLabel',
    onLogout: '&brOnLogout',
    onRefresh: '&brOnRefresh'
  },
  controller: Ctrl,
  templateUrl: 'bedrock-angular-session/session-hovercard-component.html',
  transclude: {
    'contentSlot': '?brSessionHovercardContent'
  }
};

/* @ngInject */
function Ctrl() {
  var self = this;
  self.hovercard = {
    show: false,
    triggerClicked: false
  };
}
