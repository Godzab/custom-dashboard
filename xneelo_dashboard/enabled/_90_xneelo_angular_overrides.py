from django.utils.translation import ugettext_lazy as _

# The slug of the panel group to be added to HORIZON_CONFIG. Required.
PANEL_GROUP = 'compute'
# The display name of the PANEL_GROUP. Required.
PANEL_GROUP_NAME = _('Compute')
# The slug of the dashboard the PANEL_GROUP associated with. Required.
PANEL_GROUP_DASHBOARD = 'project'

ADD_INSTALLED_APPS = ['xneelo_dashboard']

ADD_ANGULAR_MODULES = [
    'horizon.dashboard.xneelo'
]

ADD_JS_FILES = [
    'horizon/lib/angular/angular-route.js'
]

AUTO_DISCOVER_STATIC_FILES = True
