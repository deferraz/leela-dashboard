====
Leela-Dashboard
====
A simple dashboard for Leela (http://github.com/locaweb/leela-client)

Configuration
=============
All configuration for the Leela Dashboard is in the yaml file on /etc/leela/leeladashboard.yml. There it is the metrics section where you can define which leela metrics you want to display for each cluster/server and if necessary you can define Cluster Groups so you can aggregate the metrics with all servers defined on that cluster group.


Example:

metrics:
    - loadavg.1
    - memory.main.used
    - cpu.cpu.user
    - apache_default.req/s

cluster_group:
    - ApacheClusters

ApacheClusters:
    - cluster01
    - cluster02

cluster01:
    - myserver01
    - myserver02

cluster02:
    - myserver03
    - myserver04
    - myserver08


Version
======
$version 0.2

License
======
Apache 2.0
