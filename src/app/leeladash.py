#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask
from flask import render_template
from flask import url_for
from flask import request
from flask import redirect

import yaml

app = Flask(__name__)

cvalues = {}
with open('/etc/leela/leeladashboard.yml', 'r') as conf:
    cvalues = yaml.load(conf)

@app.route('/')
def index():
    return render_template('index.html',
            cvalues = cvalues)

@app.route('/static/<path:filename>')
def base_static(filename):
        return send_from_directory(app.root_path + '/static/', filename)

@app.route('/server')
def server():
    servername = request.args.get('servername', None)
    week       = request.args.get('week', False)
    return render_template('server.html',
            cvalues    = cvalues,
            servername = servername)

@app.route('/cluster_group/<cluster>', methods=['POST', 'GET'])
@app.route('/cluster_group/<cluster>/<farm>', methods=['POST', 'GET'])
def pulley(cluster=None, farm=None):
    legend = request.args.get('legend', False)
    week   = request.args.get('week', False)
    if cluster is None:
        return redirect(url_for('index'))
    else:
        if farm is None:
            return render_template('cluster_overview.html', 
                    cluster = cluster,
                    farm    = farm,
                    legend  = legend,
                    cvalues = cvalues,
                    week    = week)
        else:
            return render_template('cluster.html',
                    cluster = cluster,
                    legend  = legend,
                    cvalues = cvalues,
                    week    = week,
                    farm    = farm)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=8080)
