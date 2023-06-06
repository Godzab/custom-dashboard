/**
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @ngname horizon.dashboard.compute.instancess.actions
   *
   * @description
   * Provides all of the actions for instancess.
   */
  angular
    .module('horizon.dashboard.compute.instancess.actions', [
      'horizon.framework',
      'horizon.dashboard.compute'
    ])
    .run(registerinstancesActions);

  registerinstancesActions.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.dashboard.compute.instancess.create.service',
    'horizon.dashboard.compute.instancess.update.service',
    'horizon.dashboard.compute.instancess.delete.service',
    'horizon.dashboard.compute.instancess.resourceType'
  ];

  function registerinstancesActions (
    registry,
    gettext,
    createinstancesService,
    updateinstancesService,
    deleteinstancesService,
    resourceType
  ) {
    var instancessResourceType = registry.getResourceType(resourceType);
    instancessResourceType.globalActions
      .append({
        id: 'createinstancesAction',
        service: createinstancesService,
        template: {
          type: 'create',
          text: gettext('Create instances')
        }
      });

    instancessResourceType.batchActions
      .append({
        id: 'batchDeleteinstancesAction',
        service: deleteinstancesService,
        template: {
          type: 'delete-selected',
          text: gettext('Delete instancess')
        }
      });

    instancessResourceType.itemActions
      .append({
        id: 'updateinstancesAction',
        service: updateinstancesService,
        template: {
          text: gettext('Update instances')
        }
      })
      .append({
        id: 'deleteinstancesAction',
        service: deleteinstancesService,
        template: {
          type: 'delete',
          text: gettext('Delete instances')
        }
      });
  }
})();
