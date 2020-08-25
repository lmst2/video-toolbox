import os

from plugins._aliyunUtils import *
import api_server
from api_server import abort
from api_server import render_template
from flask import request
from werkzeug import secure_filename

server = api_server.get_server()
server.flask.config[
    'UPLOAD_PATH'] = '/home/wujiachen2016/video-toolbox/static/videos'
server.flask.config['ALLOWED_EXTENSIONS'] = ['MP4', 'MKV']


def allowed_file(filename):
    if filename == '':
        return False

    if '.' not in filename:
        return False

    ext = filename.split('.', 1)[0]

    if ext.upper() in server.flask.config['ALLOWED_EXTENSIONS']:
        return True
    else:
        return False


@server.route('/api/v1/upload', methods=['POST'])
def upload():
    files = request.files.values()
    for file in files:
        if allowed_file(file.filename):
            file.save(
                os.path.join(server.flask.config['UPLOAD_PATH'],
                             secure_filename(file.filename)))
