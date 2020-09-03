import time
import requests
from api_server import logger
from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import CommonRequest
from aliyunsdkcore.acs_exception.exceptions import ClientException
from aliyunsdkcore.acs_exception.exceptions import ServerException
from aliyunsdkvideoenhan.request.v20200320.EraseVideoLogoRequest import \
    EraseVideoLogoRequest
from aliyunsdkvideoenhan.request.v20200320.GetAsyncJobResultRequest import \
    GetAsyncJobResultRequest
from aliyunsdkvideoenhan.request.v20200320.EraseVideoSubtitlesRequest import \
    EraseVideoSubtitlesRequest

client = AcsClient('LTAI4GFXfDmBXxAnp8V3eb6X', 'lpYg9TtC0gcVY0HXlU5iFuq9m0FDnO',
                   'cn-shanghai')

from viapi.fileutils import FileUtils

file_utils = FileUtils("LTAI4GFXfDmBXxAnp8V3eb6X",
                       "lpYg9TtC0gcVY0HXlU5iFuq9m0FDnO")


def get_url(path, ext):
    try:
        return file_utils.get_oss_url(path, ext, True)
    except Exception:
        time.sleep(1)
        return get_url(path, ext)


def check_status(request_id):
    try:
        request = GetAsyncJobResultRequest()
        request.set_accept_format('json')

        request.set_JobId(request_id)

        response = client.do_action_with_exception(request)
        dict_response = eval(str(response, encoding='utf-8'))
        return dict_response['Data']
    except Exception as e:
        logger.error(e)
        return {'Status': 'PROCESSING'}


def get_async_job_result(request_id):
    while True:
        time.sleep(5)
        res = check_status(request_id)
        if res['Status'] == 'PROCESS_SUCCESS':
            video2 = eval(res['Result'])['VideoUrl']
            return True, video2
        elif res['Status'] == 'PROCESS_FAILED':
            return False, f'ErrorCode: {res["ErrorCode"]}, ErrorMessage: {res["ErrorMessage"]}'


def save_file(url, path):
    t = requests.get(url)
    with open(path, 'wb') as f:
        f.write(t.content)


def upload(path):
    try:
        ext = path.rsplit('.', 1)[1]
        url = get_url(path, ext)
        return url
    except Exception:
        upload(path)


