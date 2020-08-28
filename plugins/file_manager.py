import hashlib
import os
import random

from plugins._aliyunUtils import *
import api_server
from api_server import abort
from api_server import render_template
from api_server import request
from api_server import jsonify

server = api_server.get_server()

upload_dir = os.path.abspath(r'static\videos')
img_dir = os.path.abspath(r'static\images')
server.config[
    'UPLOAD_PATH'] = upload_dir  # '/home/wujiachen2016/video-toolbox/static/videos'
server.config['IMG_PATH'] = img_dir
server.config['ALLOWED_EXTENSIONS'] = ['MP4', 'MKV', 'MOV']


def allowed_file(filename):
    if filename == '':
        return False

    if '.' not in filename:
        return False

    ext = filename.rsplit('.', 1)[1]

    if ext.upper() in server.config['ALLOWED_EXTENSIONS']:
        return True
    else:
        return False


@server.route('/api/v1/upload', methods=['POST'])
def upload():
    if request.files:
        file = request.files['file']
        if allowed_file(file.filename):
            filename = hashlib.md5(
                file.filename.encode() +
                bytes([random.randint(0, 256)])).hexdigest() + '.' \
                       + file.filename.rsplit('.', 1)[1]
            file.save(
                os.path.join(server.config['UPLOAD_PATH'],
                             filename))
            return jsonify({'success': True, 'filename': filename})
    return jsonify({'success': False})


@server.route('/api/v1/download/<path:filename>', methods=['GET'])
def download_file(filename):
    return api_server.send_from_directory(server.config['UPLOAD_PATH'],
                                          filename)


@server.route('/api/images/<path:image>', methods=['GET'])
def images(image):
    return api_server.send_from_directory(server.config['IMG_PATH'],
                                          image)
