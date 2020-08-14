import api_server
from os import path
from flask import Flask, jsonify

api_server.init()

server = api_server.get_server()

api_server.load_plugins(
    path.join(path.dirname(__file__), 'plugins'),
    'plugins'
)

if __name__ == '__main__':
    # server.run(debug=True)
    server.run(debug=True)
