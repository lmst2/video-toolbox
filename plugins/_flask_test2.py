from flask import Flask
from flask import request

app = Flask(__name__)


@app.route('/api/v1/upload', methods=['POST'])
def upload():
    json = request.json
    return json


@app.route('/api/v1/upload', methods=['GET'])
def upload2():
    json = request.json
    return json


@app.route('/api/v1/upload3', methods=['POST'])
def upload3():
    json = request.json
    return json


app.run(debug=True)
