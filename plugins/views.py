import api_server
from api_server import abort
from api_server import render_template

server = api_server.get_server()


@server.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@server.route('/webpages/choice.html', methods=['GET'])
def choice():
    return render_template('webpages/choice.html')


@server.route('/webpages/download.html', methods=['GET'])
def download():
    return render_template('webpages/download.html')


@server.route('/webpages/in process.html', methods=['GET'])
def in_process():
    return render_template('webpages/in process.html')


@server.route('/webpages/yinxingshuiyin.html', methods=['GET'])
def yinxingshuiyin():
    return render_template('webpages/yinxingshuiyin.html')
