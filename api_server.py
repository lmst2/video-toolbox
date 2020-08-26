import importlib
import os
import re
import asyncio
from types import ModuleType
from typing import Any, Optional, Set, Tuple, Callable
from log import logger
from flask import Flask, jsonify
from flask import request
from flask import abort
from flask import render_template
from flask_cors import CORS
from flask_cors import cross_origin
from functools import wraps
from multiprocessing.pool import ApplyResult, ThreadPool

# class ApiServer:
#
#     def __init__(self, host, port, **options):
#         self.host = host
#         self.port = port
#         self.flask = Flask(__name__, **options)
#
#     def run(self, debug=False, **options):
#         self.flask.run(host=self.host, port=self.port, debug=debug, **options)
#
#     def _get_flask(self):
#         return self.flask
#
#     # route = deco(flask)
#     # def route(self, rule, **options):
#     #     def decorator(f):
#     #         @self.flask.route(rule, **options)
#     #         @wraps(f)
#     #         def deco():
#     #             return f()
#     #
#     #         return deco
#     #
#     #     return decorator
#     route = _get_flask().route
#
#     def cors(self, **options):
#         CORS(self.flask, **options)


_server: Optional[Flask] = None
loop = asyncio.get_event_loop()


def init(**options):
    global _server
    _server = Flask(__name__, **options)


def get_server():
    return _server


def apply_async(func: Callable, args: Tuple[Any, ...]) -> ApplyResult:
    pool = ThreadPool(processes=1)
    return pool.apply_async(func, args)


def load_plugins(plugin_dir: str, module_prefix: str) -> Set["Plugin"]:
    """Find all non-hidden modules or packages in a given directory,
    and import them with the given module prefix.

    Args:
        plugin_dir (str): Plugin directory to search
        module_prefix (str): Module prefix used while importing

    Returns:
        Set[Plugin]: Set of plugin objects successfully loaded
    """

    count = set()
    for name in os.listdir(plugin_dir):
        path = os.path.join(plugin_dir, name)
        if os.path.isfile(path) and \
                (name.startswith('_') or not name.endswith('.py')):
            continue
        if os.path.isdir(path) and \
                (name.startswith('_') or not os.path.exists(
                    os.path.join(path, '__init__.py'))):
            continue

        m = re.match(r'([_A-Z0-9a-z]+)(.py)?', name)
        if not m:
            continue

        result = load_plugin(f'{module_prefix}.{m.group(1)}')
        if result:
            count.add(result)
    return count


def load_plugin(module_path: str) -> Optional["Plugin"]:
    """Load a module as a plugin

    Args:
        module_path (str): path of module to import

    Returns:
        Optional[Plugin]: Plugin object loaded
    """
    try:
        module = importlib.import_module(module_path)
        name = getattr(module, '__plugin_name__', None)
        usage = getattr(module, '__plugin_usage__', None)
        plugin = Plugin(module, name, usage)
        logger.info(f'Succeeded to import "{module_path}"')
        return plugin
    except Exception as e:
        logger.error(f'Failed to import "{module_path}", error: {e}')
        logger.exception(e)
        return None


class Plugin:
    __slots__ = ('module', 'name', 'usage')

    def __init__(self,
                 module: ModuleType,
                 name: Optional[str] = None,
                 usage: Optional[Any] = None):
        self.module = module
        self.name = name
        self.usage = usage
