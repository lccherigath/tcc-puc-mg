# -*- coding: utf-8 -*-
from flasgger import Swagger


def init_app(app):
    Swagger(app)
