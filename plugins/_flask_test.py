from flask import Flask
from flask_cors import CORS
from os import path

template_dir = path.abspath(r'templates')
app = Flask(__name__, template_folder=template_dir, static_url_path='/images')
CORS(app)

# @app.route('/api/v1/upload', methods=['POST'])
# def upload():
#     return 'ok'

app.run(debug=True)
