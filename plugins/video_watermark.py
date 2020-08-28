import os
import ffmpy
import shutil
import random
import asyncio
import functools
import concurrent.futures

from plugins._aliyunUtils import *
from api_server import logger
from api_server import abort
from api_server import request
import api_server
from plugins.file_manager import upload_dir

server = api_server.get_server()

tasks = {}


def load_dir(_dir, video_name):
    video = os.path.join(_dir, video_name)
    temp_dir = os.path.join(_dir, f'{video_name.split(".")[0]}_temps')
    processed_dir = os.path.join(_dir, f'{video_name.split(".")[0]}_processed')

    os.makedirs(temp_dir, exist_ok=True)
    os.makedirs(processed_dir, exist_ok=True)
    return video, temp_dir, processed_dir


def extract_frames(video, temp_dir):
    ff = ffmpy.FFmpeg(
        inputs={video: None},
        outputs={os.path.join(temp_dir, '%6d.jpg'): '-vsync 0'}
    )
    ff.run()


def add_watermark(orig, watermark, count=0):
    try:
        request = CommonRequest()
        request.set_accept_format('json')
        request.set_domain('imageenhan.cn-shanghai.aliyuncs.com')
        request.set_method('POST')
        request.set_protocol_type('https')  # https | http
        request.set_version('2019-09-30')
        request.set_action_name('ImageBlindCharacterWatermark')

        request.add_query_param('RegionId', "cn-shanghai")
        request.add_query_param('FunctionType', "encode_text")
        request.add_query_param('QualityFactor', "100")
        request.add_query_param('OriginImageURL', orig)
        request.add_query_param('Text', watermark)
        request.add_query_param('OutputFileType', "jpg")

        response = client.do_action_with_exception(request)
        dict_response = eval(str(response, encoding='utf-8'))
        return dict_response['Data']['WatermarkImageURL']
    except Exception as e:
        if count > 100:
            logger.warn(f'Image {orig} have failed {count} times retrying.')
            logger.warn(e)
        return add_watermark(orig, watermark, count)


def extract_watermark(orig, watermarked, count=0):
    try:
        request = CommonRequest()
        request.set_accept_format('json')
        request.set_domain('imageenhan.cn-shanghai.aliyuncs.com')
        request.set_method('POST')
        request.set_protocol_type('https')  # https | http
        request.set_version('2019-09-30')
        request.set_action_name('ImageBlindCharacterWatermark')

        request.add_query_param('RegionId', "cn-shanghai")
        request.add_query_param('FunctionType', "decode_text")
        request.add_query_param('QualityFactor', "90")
        request.add_query_param('OriginImageURL', orig)
        request.add_query_param('WatermarkImageURL', watermarked)
        request.add_query_param('OutputFileType', "jpg")

        response = client.do_action_with_exception(request)
        dict_response = eval(str(response, encoding='utf-8'))
        return dict_response['Data']['TextImageURL']
    except Exception as e:
        if count > 100:
            logger.warn(f'Image {orig} have failed {count} times retrying.')
            logger.warn(e)
        return add_watermark(orig, watermarked, count)


def process_image(di, watermark, temp_dir, processed_dir):
    try:
        orig = get_url(os.path.join(temp_dir, di), "jpg")
        res = add_watermark(orig, watermark)
        save_file(res, os.path.join(processed_dir, di))
        logger.debug(f'successfully processed {di}')
    except Exception as e:
        logger.error(f'Failed to process image {di} retrying')
        logger.exception(e)
        process_image(di, watermark, temp_dir, processed_dir)


def worker(_dir, video_name, watermark):
    video, temp_dir, processed_dir = load_dir(_dir, video_name)

    logger.info(f'extracting frames from video {video_name}')
    extract_frames(video, temp_dir)
    logger.info('All frames extracted')
    dirs = os.listdir(temp_dir)
    process_image_w = functools.partial(process_image, watermark=watermark)
    process_image_w_t = functools.partial(process_image_w, temp_dir=temp_dir)
    process_image_w_t_p = functools.partial(process_image_w_t,
                                            processed_dir=processed_dir)

    with concurrent.futures.ThreadPoolExecutor() as executor:
        executor.map(process_image_w_t_p, dirs)

    res = convert_to_video(_dir, video_name, processed_dir)

    shutil.rmtree(temp_dir)
    shutil.rmtree(processed_dir)

    return res


@server.route('/api/video/admin/v1.0/add/watermark', methods=['POST'])
def video_watermark():
    json = request.json
    job_id = str(hash(json['video_name'] + str(random.randint(0, 1000))))
    # loop = api_server.loop
    # loop.run_until_complete(main(json['dir'], json['video_name'], job_id, loop))

    async_result = api_server.apply_async(worker, (
        upload_dir, json['video_name'], json['text']))
    global tasks
    tasks[job_id] = async_result
    return api_server.jsonify({'Request_id': job_id})


@server.route('/api/video/admin/v1.0/add/watermark/<request_id>',
              methods=['GET'])
def get_video_watermark_result(request_id):
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


@server.route('/api/video/admin/v1.0/add/watermark/preview/<video_name>',
              methods=['GET'])
def get_video_watermark_preview(video_name):
    vname, wmark = video_name.split('|')
    if os.path.exists(
            os.path.join(server.config['UPLOAD_PATH'], vname)):
        ori = os.path.join(upload_dir,
                           vname.rsplit('.', 1)[0] + '_temps')
        pros = os.path.join(upload_dir,
                            vname.rsplit('.', 1)[0] + '_processed')
        process_image('000001.jpg', wmark, ori, pros)
        wimg = get_url(os.path.join(pros, '000001.jpg'), "jpg")
        oimg = get_url(os.path.join(ori, '000001.jpg'), "jpg")
        w = extract_watermark(oimg, wimg)
        return api_server.jsonify({'watermark': w, 'success': True})
    else:
        return api_server.jsonify({'watermark': '', 'success': False})


def convert_to_video(base_dir, video_name, processed_dir, crf=8):
    watermarked_video_name = '_watermarked.'.join(video_name.split('.'))
    ff2 = ffmpy.FFmpeg(
        inputs={os.path.join(processed_dir, '%6d.jpg'): '-r 23 -f image2'},
        outputs={os.path.join(
            base_dir, watermarked_video_name):
                     f'-vcodec libx264 -crf {crf} -pix_fmt yuv420p'}
    )
    ff2.run()
    return watermarked_video_name


# def main(_dir, video_name, job_id, loop):
#     global tasks
#     tasks[job_id] = loop.create_task(worker(_dir, video_name))
