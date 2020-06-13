# -*- coding: utf-8 -*-
from flask import abort
from flask_restful import Resource
from py_app.models.mod1_ativos import ComplexoMinerario
from py_app.blueprints.rest_api.utils import error_handler


class MiningComplexResource(Resource):
    def get(self):
        return list_mining_complex()
    
    def post(self):
        pass


class MiningComplexItemResource(Resource):
    def get(self, mining_complex_id):
        return list_mining_complex(mining_complex_id)
    
    def put(self):
        pass

    def delete(self):
        pass


def list_mining_complex(id=None):
    try:
        if id:
            mining_complex = ComplexoMinerario.query.filter_by(id=id).first()
            if not mining_complex:
                return error_handler.not_found()
            return_data = mining_complex.to_dict(complete=True)
        else:
            mining_complexes = ComplexoMinerario.query.all()
            return_data = {
                'count': len(mining_complexes),
                'next': None,
                'previous': None,
                'results': [mining_complex.to_dict() for mining_complex in mining_complexes]
            }
        return return_data, 200
    except Exception as e:
        return error_handler.internal_error(e)
