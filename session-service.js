/*!
 * Session Service.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
/* @ngInject */
export default function factory($http, $q, brModelService) {
  const service = {};

  // empty session to start
  service.session = {};

  // TODO: make URL configurable
  service.get = function() {
    return $http({method: 'GET', url: '/session'})
      .then(response => {
        // update session in place
        brModelService.replace(service.session, response.data);

        // FIXME: why is it necessary to wrap this in $q.resolve?
        // without this wrapping, the view in the test-harness is not updated

        return service.session;
        // return $q.resolve(service.session);
      });
  };

  /**
   * Logs out any identity that currently has an authenticated session.
   *
   * @return a Promise that resolves once the logout has finished.
   */
  // TODO: make URL configurable
  service.logout = () => $http.get('/session/logout').then(response => {
    if(response.status !== 200) {
      throw new Error('Logout failed.');
    }
    // refresh session, ignore error
    return service.get().catch(() => {});
  });

  return service;
}
