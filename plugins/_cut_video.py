import re
import math
from optparse import OptionParser
from api_server import logger

from subprocess import check_call, PIPE, Popen
import shlex


def get_length(filename, split_length):
    length_regexp = 'Duration: (\d{2}):(\d{2}):(\d{2})\.\d+,'
    re_length = re.compile(length_regexp)
    p1 = Popen(["ffmpeg", "-i", filename], stdout=PIPE, stderr=PIPE, universal_newlines=True)
    # get p1.stderr as input
    output = Popen(["grep", 'Duration'], stdin=p1.stderr, stdout=PIPE, universal_newlines=True)
    p1.stdout.close()
    matches = re_length.search(output.stdout.read())
    video_length = 0
    if matches:
        video_length = int(matches.group(1)) * 3600 + \
                       int(matches.group(2)) * 60 + \
                       int(matches.group(3))
        logger.info(video_length)

    split_count = math.ceil(video_length / split_length)
    logger.info(f"split into {split_count} videos")
    return split_count


def split_video(filename, split_length):
    # filename, split_length = parse_options()
    try:
        length_regexp = 'Duration: (\d{2}):(\d{2}):(\d{2})\.\d+,'
        re_length = re.compile(length_regexp)
        if split_length <= 0:
            logger.error("Split length must greater than 0")
            return {'success': False, 'msg': "Split length must greater than 0", 'count': 0}

        p1 = Popen(["ffmpeg", "-i", filename], stdout=PIPE, stderr=PIPE, universal_newlines=True)
        # get p1.stderr as input
        output = Popen(["grep", 'Duration'], stdin=p1.stderr, stdout=PIPE, universal_newlines=True)
        p1.stdout.close()
        matches = re_length.search(output.stdout.read())
        if matches:
            video_length = int(matches.group(1)) * 3600 + \
                           int(matches.group(2)) * 60 + \
                           int(matches.group(3))
            logger.info("Video length in seconds: {}".format(video_length))
        else:
            logger.error("Can't determine video length.")
            return {'success': False, 'msg': "Can't determine video length.", 'count': 0}

        split_count = math.ceil(video_length / split_length)

        if split_count == 1:
            logger.info("Video length is less than the target split length, skipping.")
            return {'success': True, 'count': 1}

        videos = []

        for n in range(split_count):
            split_start = split_length * n
            pth, ext = filename.rsplit(".", 1)
            cmd = "ffmpeg -i {} -vcodec copy  -strict -2 -ss {} -t {} {}-{}.{}". \
                format(filename, split_start, split_length, pth, n, ext)
            logger.info("About to run: {}".format(cmd))
            check_call(shlex.split(cmd), universal_newlines=True)
            videos.append(f'{pth}-{n}.{ext}')
        return {'success': True, 'count': split_count, 'files': videos}
    except Exception as er:
        return {'success': False, 'msg': str(er), 'count': 0}


# def parse_options():
#     parser = OptionParser()
#
#     parser.add_option("-f", "--file",
#                       dest="filename",
#                       help="file to split, for example sample.avi",
#                       type="string",
#                       action="store"
#                       )
#     parser.add_option("-s", "--split-size",
#                       dest="split_size",
#                       help="split or chunk size in seconds, for example 10",
#                       type="int",
#                       action="store"
#                       )
#     (options, args) = parser.parse_args()
#
#     if options.filename and options.split_size:
#
#         return options.filename, options.split_size
#
#     else:
#         parser.print_help()
#         raise SystemExit


if __name__ == '__main__':
    try:
        split_video()
    except Exception as e:
        print(e)
