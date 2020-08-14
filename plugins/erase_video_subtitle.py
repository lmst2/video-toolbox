from plugins._aliyunUtils import *
import api_server
from api_server import abort

server = api_server.get_server()


def erase_subtitle_helper(video, box):
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


@server.route('/video/api/admin/v1.0/erase/subtitle', methods=['POST'])
def erase_subtitle():
    if not api_server.request.json or 'video' not in api_server.request.json:
        abort(400)
    request_id = erase_subtitle_helper(api_server.request.json['video'],
                                       api_server.request.json['box'])
    return api_server.jsonify({'Request_id': request_id})
