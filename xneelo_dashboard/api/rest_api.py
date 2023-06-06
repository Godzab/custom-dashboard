#    Licensed under the Apache License, Version 2.0 (the "License"); you may
#    not use this file except in compliance with the License. You may obtain
#    a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#    License for the specific language governing permissions and limitations
#    under the License.

from django.views import generic

from xneelo_dashboard.api import client

from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils


def change_to_id(obj):
    """Change key named 'uuid' to 'id'

    API returns objects with a field called 'uuid' many of Horizons
    directives however expect objects to have a field called 'id'.
    """
    obj['id'] = obj.pop('uuid')
    return obj


@urls.register
class instances(generic.View):
    """API for retrieving a single instances"""
    url_regex = r'compute/instancess/(?P<id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, id):
        """Get a specific instances"""
        return change_to_id(client.instances_show(request, id).to_dict())

    @rest_utils.ajax(data_required=True)
    def post(self, request, id):
        """Update a instances.

        Returns the updated instances object on success.
        """
        instances = client.instances_update(request, id, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/compute/instances/%s' % instances.uuid,
            instances.to_dict())


@urls.register
class instancess(generic.View):
    """API for instancess"""
    url_regex = r'compute/instancess/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a list of the instancess for a project.

        The returned result is an object with property 'items' and each
        item under this is a instances.
        """
        result = client.instances_list(request)
        return {'items': [change_to_id(n.to_dict()) for n in result]}

    @rest_utils.ajax(data_required=True)
    def delete(self, request):
        """Delete one or more instancess by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        for id in request.DATA:
            client.instances_delete(request, id)

    @rest_utils.ajax(data_required=True)
    def put(self, request):
        """Create a new instances.

        Returns the new instances object on success.
        """
        instances = client.instances_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/compute/instances/%s' % instances.uuid,
            instances.to_dict())
