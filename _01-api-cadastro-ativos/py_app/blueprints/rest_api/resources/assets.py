# -*- coding: utf-8 -*-
from flask import abort
from flask_restful import Resource
from py_app.models.mod1_ativos import Ativo, Categoria
from py_app.blueprints.rest_api.utils import error_handler


class AssetResource(Resource):
    def get(self):
        return list_assets()


class AssetItemResource(Resource):
    def get(self, asset_id):
        return list_assets(asset_id)


class EquipmentResource(Resource):
    def get(self):
        return list_equipments()


class EquipmentMaintenanceResource(Resource):
    def post(self):
        pass


class EquipmentCategoriesResource(Resource):
    def get(self):
        return list_categories()


def list_assets(id=None):
    try:
        if id:
            asset = Ativo.query.filter_by(id=id).first()
            if not asset:
                return error_handler.not_found()
            return_data = asset.to_dict()
        else:
            assets = Ativo.query.all()
            return_data = {
                'count': len(assets),
                'next': None,
                'previous': None,
                'results': [asset.to_dict() for asset in assets]
            }
        return return_data, 200
    except Exception as e:
        return error_handler.internal_error(e)


def list_equipments():
    try:
        ids_not_equipments = [5, 8, 9, 10, 15]
        # equipments = Ativo.query.filter(~Ativo.categoria_id.in_(ids_not_equipments)).all()
        equipment_by_category = Categoria.query.filter(~Categoria.id.in_(ids_not_equipments)).all()
        return_data = {
            'count': len(equipment_by_category),
            'next': None,
            'previous': None,
            'results': [category.to_dict_with_assets() for category in equipment_by_category]
        }
        return return_data, 200
    except Exception as e:
        return error_handler.internal_error(e)


def list_categories():
    try:
        ids_not_equipments = [5, 8, 9, 10, 15]
        categories = Categoria.query.filter(~Categoria.id.in_(ids_not_equipments)).all()
        return_data = {
            'count': len(categories),
            'next': None,
            'previous': None,
            'results': [category.to_dict() for category in categories]
        }
        return return_data, 200
    except Exception as e:
        return error_handler.internal_error(e)
