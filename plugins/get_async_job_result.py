import os

from plugins._aliyunUtils import *
import api_server

server = api_server.get_server()
cache = {}


@server.route('/api/video/admin/v1.0/job/status', methods=['POST'])
def get_async_job_result():
    request_id = api_server.request.json['Request_id']
    video_name = api_server.request.json['video_name']
    vname, ext = video_name.rsplit('.', 1)
    res = cache.get(request_id, None)
    if not res:
        res = check_status(request_id)
    api_server.logger.info(res)
    if res['Status'] == 'PROCESS_SUCCESS' or request_id in cache:
        res2 = eval(res['Result'])
        path = os.path.join(server.config['UPLOAD_PATH'], vname, request_id+'.'+ext)
        os.makedirs(os.path.join(server.config['UPLOAD_PATH'], vname), exist_ok=True)
        async_res = api_server.apply_async(save_file, (res2['VideoUrl'], path))
        api_server.jobs[request_id] = async_res
        if request_id not in cache:
            cache[request_id] = res
        return api_server.jsonify({'Status': 'PROCESS_SUCCESS', 'Result': res2})
    elif res['Status'] == 'PROCESS_FAILED':
        return api_server.jsonify({'Status': 'PROCESS_FAILED',
                                   'Result': {'ErrorCode': res["ErrorCode"],
                                              'ErrorMessage': res[
                                                  "ErrorMessage"]}})
    elif res['Status'] == 'PROCESSING' or res['Status'] == 'QUEUING':
        return api_server.jsonify({'Status': "PROCESSING",
                                   'Result': {'ErrorCode': "",
                                              'ErrorMessage': "PROCESSING"}})
