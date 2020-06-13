# -*- coding: utf-8 -*-
from flask_cors import CORS


def init_app(app):
    CORS(app)
