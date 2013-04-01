#!/usr/bin/env python

from setuptools import setup

setup(
    name         = 'leela-dashboard',
    version      = '0.1',
    description  = 'Simple Dashboard for Leela System',
    author       = 'Andre Ferraz',
    author_email = 'deferraz@terra.com.br',
    url          = 'http://www.sysadmin.io',
    packages     = ['leeladash'],
    package_dir  = {'leeladash': 'src/app'},
    include_package_data = True,
    data_files   = [('/etc/leela', ['src/etc/leela/leeladashboard.yml']),
                    ('/usr/share/leeladash',  ['src/wsgi/leeladash.wsgi'])]

)
