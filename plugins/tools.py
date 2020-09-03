import os
import random
import ffmpy
from plugins._aliyunUtils import *
import api_server
from api_server import abort
from api_server import render_template
from api_server import request
from api_server import jsonify
from plugins._cut_video import get_length

server = api_server.get_server()


@server.route('/api/v1/preview/<video_name>', methods=['GET'])
def get_preview(video_name):
    length = get_length(os.path.join(server.config['UPLOAD_PATH'], video_name), 1)
    frame_num = random.randint(1, length)
    ff = ffmpy.FFmpeg(
        inputs={os.path.join(server.config['UPLOAD_PATH'], video_name): ''},
        outputs={os.path.join(server.config['UPLOAD_PATH'], video_name.rsplit('.', 1)[0]+'.png'): f"-vf select='eq(n\,{frame_num})' -vsync 0"}
    )
    ff.run()
    fname = video_name.rsplit('.', 1)[0]+'.png'
    return jsonify({'success': True, 'url': 'http://34.92.52.134:5000/api/v1/download/'+fname})
