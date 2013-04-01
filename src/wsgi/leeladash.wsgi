#!/usr/bin/env python

from leeladash.dashctlinux import app as application
from werkzeug.debug import DebuggedApplication

application = DebuggedApplication(application, evalex = True)
