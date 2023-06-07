===============================
Xneelo Dashboard
===============================

Xneelo Dashboard is a plugin for OpenStack Dashboard that provides customised workflows for Xneelo customers.

Manual Installation
-------------------

Begin by cloning the Xneelo Dashboard repositories::

    git clone <repo_url>/xneelo-dashboard && cd xneelo-dashboard

Install Xneelo Dashboard with all dependencies in your virtual environment::

    tools/with_venv.sh pip install -e ./xneelo_dashboard

And enable it in Horizon::

    ln -s ../xneelo-dashboard/xneelo_dashboard/enabled/_90_xneelo_angular_overrides.py horizon/openstack_dashboard/local/enabled
    Or
    cp -rv ../xneelo-dashboard/xneelo_dashboard/enabled/_90_xneelo_angular_overrides.py horizon/openstack_dashboard/local/enabled

To run horizon with the newly enabled Xneelo Dashboard plugin run::

    cd <horizon_folder>
    python manage.py collectstatic --noinput
    python manage.py compress --force
    systemctl restart apache2 # or nginx (depending on your installation)
