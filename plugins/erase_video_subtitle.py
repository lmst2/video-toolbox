import os
import random
import shutil
import concurrent.futures

import ffmpy

from plugins._aliyunUtils import *
import api_server
from api_server import abort
from api_server import logger
from plugins._cut_video import get_length, split_video

server = api_server.get_server()
tasks = {}
counts = {}


def erase_subtitle_helper(video, box, count=0):
    try:
        time.sleep(random.randint(2, 211)/1000)
        request = EraseVideoSubtitlesRequest()
        request.set_accept_format('json')

        request.set_VideoUrl(video)
        request.set_BX(box['BX'])
        request.set_BY(box['BY'])
        request.set_BW(box['BW'])
        request.set_BH(box['BH'])

        response = client.do_action_with_exception(request)
        dict_response = eval(str(response, encoding='utf-8'))
        return dict_response['RequestId']
    except Exception as e:
        logger.warn(f'Video {video} have failed {count} times retrying.')
        logger.warn(e)
        count += 1
        return erase_subtitle_helper(video, box, count)


@server.route('/api/video/admin/v1.0/erase/subtitle', methods=['POST'])
def erase_subtitle():
    if not api_server.request.json or 'video_name' not in api_server.request.json:
        abort(400)
    json = api_server.request.json
    job_id = str(hash(json['video_name'] + str(random.randint(0, 1000))))
    # request_id = erase_subtitle_helper(api_server.request.json['video_name'],
    #                                    api_server.request.json['box'])
    video = os.path.join(server.config['UPLOAD_PATH'], json['video_name'])
    count = get_length(video, 60)
    async_result = api_server.apply_async(erase_video_subtitle_main, (json['video_name'], json['box']))
    global tasks
    tasks[job_id] = async_result

    return api_server.jsonify({'Request_id': job_id, 'count': count})

################################################################


def subtitle_process_video(video_name):
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


def erase_video_subtitle_main(video_name, box):
    res = subtitle_process_video(video_name)
    if isinstance(res, str):
        return {'success': False, 'msg': res}
    else:
        urls = []
        with concurrent.futures.ThreadPoolExecutor() as executor:
            for url in executor.map(upload, [os.path.join(server.config['UPLOAD_PATH'], r) for r in res]):
                urls.append(url)
        return [erase_subtitle_helper(ur, box) for ur in urls]



@server.route('/api/video/admin/v1.0/erase/subtitle/<request_id>', methods=['GET'])
def get_erase_video_subtitle_result(request_id):
    job_id = request_id
    task = tasks.get(job_id, None)
    if not task:
        return api_server.jsonify(
            {'Status': 'PROCESS_FAILED', 'ErrorMessage': 'No such request id'})
    if task.ready():
        result = task.get()
        if isinstance(result, dict):
            return api_server.jsonify(
                {'Status': 'PROCESS_FAILED', 'ErrorMessage': result['msg']})
        return api_server.jsonify(
            {'Status': 'PROCESS_SUCCESS', 'Result': {'request_ids': result}})
    else:
        return api_server.jsonify({'Status': 'PROCESSING', 'Result': ''})


@server.route('/api/video/admin/v1.0/erase/subtitle/combine', methods=['POST'])
def subtitle_combine_video():
    json = api_server.request.json
    job_id = str(hash(json['video_name'] + str(random.randint(0, 1000))))
    async_result = api_server.apply_async(subtitle_combine, (json['video_name'], json['filenames']))
    global tasks
    tasks[job_id] = async_result
    return api_server.jsonify({'Request_id': job_id})


def subtitle_till_ready(job, count=0):
    if job.ready():
        return
    time.sleep(3)
    subtitle_till_ready(job, count + 1)


def subtitle_combine(video_name, filenames):
    vname, ext = video_name.rsplit('.', 1)
    process_dir = os.path.join(server.config['UPLOAD_PATH'], vname)
    os.makedirs(process_dir, exist_ok=True)
    files = ''
    for file in filenames:
        subtitle_till_ready(api_server.jobs[file])
        files += f'file {file+"."+ext} \n'
    with open(os.path.join(process_dir, 'files.txt'), 'w') as f:
        f.write(files)
    ff = ffmpy.FFmpeg(
        inputs={os.path.join(process_dir, 'files.txt'): '-f concat -safe 0'},
        outputs={os.path.join(server.config['UPLOAD_PATH'], vname+'_processed.'+ext): '-c copy'}
    )
    ff.run()
    shutil.rmtree(process_dir)
    return vname+'_processed.'+ext


@server.route('/api/video/admin/v1.0/erase/subtitle/combine/<request_id>', methods=['GET'])
def subtitle_get_combine_video_result(request_id):
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

