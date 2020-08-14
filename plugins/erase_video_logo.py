from plugins._aliyunUtils import *
import api_server
from api_server import abort

server = api_server.get_server()


def erase_video_logo_helper(video, boxess):
    request = EraseVideoLogoRequest()
    request.set_accept_format('json')

    request.set_VideoUrl(video)
    request.set_Boxess(boxess)

    response = client.do_action_with_exception(request)
    dict_response = eval(str(response, encoding='utf-8'))
    return dict_response['RequestId']


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


@server.route('/video/api/admin/v1.0/erase/logo', methods=['POST'])
def erase_video_logo():
    if not api_server.request.json or 'video' not in api_server.request.json:
        abort(400)
    request_id = erase_video_logo_helper(api_server.request.json['video'],
                                         eval(
                                             api_server.request.json['boxess']))
    return api_server.jsonify({'request_id': request_id})
