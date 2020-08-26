import os

from plugins._aliyunUtils import *
import api_server
from api_server import abort
from api_server import render_template
from api_server import request
from api_server import jsonify
from werkzeug.utils import secure_filename

server = api_server.get_server()
server.config[
    'UPLOAD_PATH'] = r'C:\Users\wujia\Desktop\code\playground\static\videos'  # '/home/wujiachen2016/video-toolbox/static/videos'
server.config['ALLOWED_EXTENSIONS'] = ['MP4', 'MKV']


def allowed_file(filename):
    if filename == '':
        return False

    if '.' not in filename:
        return False

    ext = filename.split('.', 1)[0]

    if ext.upper() in server.config['ALLOWED_EXTENSIONS']:
        return True
    else:
        return False


@server.route('/api/v1/upload', methods=['POST'])
def upload():
    if request.files:
        file = request.files['file']
        print(file.filename)
        if allowed_file(file.filename):
            file.save(
                os.path.join(server.config['UPLOAD_PATH'],
                             secure_filename(file.filename)))
    return jsonify({'success': True})
