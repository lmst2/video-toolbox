import api_server
from os import path
from flask import Flask, jsonify

template_dir = path.abspath(r'plugins\templates')
api_server.init(template_folder=template_dir, static_url_path='/images')

server = api_server.get_server()

api_server.load_plugins(
    path.join(path.dirname(__file__), 'plugins'),
    'plugins'
)

if __name__ == '__main__':
    api_server.CORS(server, resources={r"/api/*": {"origins": "*"}})
    server.run(debug=True)
