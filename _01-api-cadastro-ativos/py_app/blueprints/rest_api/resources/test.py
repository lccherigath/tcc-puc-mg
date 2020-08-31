# -*- coding: utf-8 -*-
from flask_restful import Resource


class TestResource(Resource):
    def get(self):
        return {'status': 'ok'}
