from plugins._aliyunUtils import *
import api_server

server = api_server.get_server()


@server.route('/api/video/admin/v1.0/job/status', methods=['POST'])
def get_async_job_result():
    request_id = api_server.request.json['Request_id']
    res = check_status(request_id)
    if res['Status'] == 'PROCESS_SUCCESS':
        res2 = eval(res['Result'])
        return api_server.jsonify({'Success': 'true', 'Result': res2})
    elif res['Status'] == 'PROCESS_FAILED':
        return api_server.jsonify({'Success': 'false',
                                   'Result': {'ErrorCode': res["ErrorCode"],
                                              'ErrorMessage': res[
                                                  "ErrorMessage"]}})
    elif res['Status'] == 'PROCESSING':
        return api_server.jsonify({'Success': 'false',
                                   'Result': {'ErrorCode': "",
                                              'ErrorMessage': "PROCESSING"}})
