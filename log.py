import logging
from flask import logging as floger

logger = logging.getLogger('api_server')
logger = floger.create_logger(logger)
