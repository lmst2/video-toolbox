import os
import concurrent.futures
import random
import shutil
import time

from plugins._aliyunUtils import *
import api_server
from api_server import abort
from api_server import logger
from plugins._cut_video import split_video
from plugins._cut_video import get_length
import ffmpy

server = api_server.get_server()
tasks = {}
counts = {}


def erase_video_logo_helper(video, boxess, count=0):
    try:
        request = EraseVideoLogoRequest()
        request.set_accept_format('json')

        request.set_VideoUrl(video)
        request.set_Boxess(boxess)

        response = client.do_action_with_exception(request)
        dict_response = eval(str(response, encoding='utf-8'))
        return dict_response['RequestId']
    except Exception as e:
        logger.warn(f'Video {video} have failed {count} times retrying.')
        logger.warn(e)
        return erase_video_logo_helper(video, boxess, count)


"""[{
    "H": "h",
    "W": "w",
    "X": "x",
    "Y": "y"
}]"""

"""def process_video(video, boxess):
    video_url = get_url(video, video.split('.')[-1])
    request_id = erase_video_logo(video_url, boxess)
    return get_async_job_result(request_id)"""


def process_video(video_name):
    path = os.path.join(server.config['UPLOAD_PATH'], video_name)
    res = split_video(path, 60)
    global counts
    counts[video_name] = res['count']
    if res['success']:
        if res['count'] == 1:
            return [video_name]
        else:
            return res['files']
    else:
        return res['msg']


def erase_video_logo_main(video_name, boxess):
    res = process_video(video_name)
    if isinstance(res, str):
        return {'success': False, 'msg': res}
    else:
        urls = []
        with concurrent.futures.ThreadPoolExecutor() as executor:
            for url in executor.map(upload, [os.path.join(server.config['UPLOAD_PATH'], r) for r in res]):
                urls.append(url)
        return [erase_video_logo_helper(ur, boxess) for ur in urls]


@server.route('/api/video/admin/v1.0/erase/logo', methods=['POST'])
def erase_video_logo():
    if not api_server.request.json or 'video_name' not in api_server.request.json:
        abort(400)
    json = api_server.request.json
    job_id = str(hash(json['video_name'] + str(random.randint(0, 1000))))
    # request_id = erase_video_logo_helper(api_server.request.json['video_name'],
    #                                      eval(
    #                                          api_server.request.json['boxess']))
    video = os.path.join(server.config['UPLOAD_PATH'], json['video_name'])
    count = get_length(video, 60)
    async_result = api_server.apply_async(erase_video_logo_main, (json['video_name'], json['boxess']))
    global tasks
    tasks[job_id] = async_result

    return api_server.jsonify({'Request_id': job_id, 'count': count})


@server.route('/api/video/admin/v1.0/erase/logo/<request_id>', methods=['GET'])
def get_erase_video_logo_result(request_id):
    job_id = request_id
    task = tasks.get(job_id, None)
    if not task:
        return api_server.jsonify(
            {'Status': 'PROCESS_FAILED', 'ErrorMessage': 'No such request id'})
    if task.ready():
        result = task.get()
        return api_server.jsonify(
            {'Status': 'PROCESS_SUCCESS', 'Result': {'request_ids': result}})
    else:
        return api_server.jsonify({'Status': 'PROCESSING', 'Result': ''})


@server.route('/api/video/admin/v1.0/erase/logo/combine', methods=['POST'])
def combine_video():
    json = api_server.request.json
    job_id = str(hash(json['video_name'] + str(random.randint(0, 1000))))
    async_result = api_server.apply_async(combine, json)
    global tasks
    tasks[job_id] = async_result
    return api_server.jsonify({'Request_id': job_id})


def combine(json):
    vname, ext = json['video_name'].rsplit('.', 1)
    process_dir = os.path.join(server.config['UPLOAD_PATH'], vname)
    os.makedirs(process_dir, exist_ok=True)
    files = ''
    for file in json['filenames']:
        files += f'file {file+ext} \n'
    with open(os.path.join(process_dir, 'files.txt')) as f:
        f.write(files)
    ff = ffmpy.FFmpeg(
        inputs={os.path.join(process_dir, 'files.txt'): '-f concat -safe 0'},
        outputs={os.path.join(server.config['UPLOAD_PATH'], vname+'_processed.'+ext): '-c copy'}
    )
    ff.run()
    shutil.rmtree(process_dir)
    return vname+'_processed.'+ext


@server.route('/api/video/admin/v1.0/erase/logo/combine/<request_id>', methods=['GET'])
def get_combine_video_result(request_id):
    job_id = request_id
    task = tasks.get(job_id, None)
    if not task:
        return api_server.jsonify(
            {'Status': 'PROCESS_FAILED', 'ErrorMessage': 'No such request id'})
    if task.ready():
        result = task.get()
        return api_server.jsonify(
            {'Status': 'PROCESS_SUCCESS', 'Result': {'video_name': result}})
    else:
        return api_server.jsonify({'Status': 'PROCESSING', 'Result': ''})


