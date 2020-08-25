from plugins._aliyunUtils import *
import api_server
from api_server import abort
from api_server import render_template

server = api_server.get_server()
UPLOAD_DIR = ''


@server.route('/api/v1/upload', methods=['POST'])
def upload():
    pass
