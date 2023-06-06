/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
  'use strict';

  angular
    .module('horizon.app.core.openstack-service-api')
    .factory('horizon.app.core.openstack-service-api.compute', API);

  API.$inject = [
    'horizon.framework.util.http.service',
    'horizon.framework.widgets.toast.service',
    'horizon.framework.util.i18n.gettext'
  ];

  function API(apiService, toastService, gettext) {
    var service = {
      getinstances: getinstances,
      getinstancess: getinstancess,
      createinstances: createinstances,
      updateinstances: updateinstances,
      deleteinstances: deleteinstances
    };

    return service;

    ///////////////////////////////
    // instancess

    function getinstances(id) {
      return apiService.get('/api/compute/instancess/' + id)
        .error(function() {
          var msg = gettext('Unable to retrieve the instances with id: %(id)s.');
          toastService.add('error', interpolate(msg, {id: id}, true));
        });
    }

    function getinstancess() {
      return apiService.get('/api/compute/instancess/')
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the instancess.'));
        });
    }

    function createinstances(params) {
      return apiService.put('/api/compute/instancess/', params)
        .error(function() {
          var msg = gettext('Unable to create the instances with name: %(name)s');
          toastService.add('error', interpolate(msg, { name: params.name }, true));
        });
    }

    function updateinstances(id, params) {
      return apiService.post('/api/compute/instancess/' + id, params)
        .error(function() {
          var msg = gettext('Unable to update the instances with id: %(id)s');
          toastService.add('error', interpolate(msg, { id: params.id }, true));
        });
    }

    function deleteinstances(id, suppressError) {
      var promise = apiService.delete('/api/compute/instancess/', [id]);
      return suppressError ? promise : promise.error(function() {
        var msg = gettext('Unable to delete the instances with id: %(id)s');
        toastService.add('error', interpolate(msg, { id: id }, true));
      });
    }
  }
}());
