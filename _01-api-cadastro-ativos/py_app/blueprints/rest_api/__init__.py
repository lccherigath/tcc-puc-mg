# -*- coding: utf-8 -*-
from flask import Blueprint
from flask_restful import Api

from .resources.assets import AssetResource, AssetItemResource, EquipmentResource, EquipmentCategoriesResource
from .resources.mining_complex import \
    MiningComplexResource, MiningComplexItemResource, MiningComplexEquipmentsResource, MiningComplexStructuresResource, MiningComplexScheduleResource

bp = Blueprint('restapi', __name__, url_prefix='/api/v1')
api = Api(bp)


def init_app(app):
    api.add_resource(AssetResource, '/ativos')
    api.add_resource(AssetItemResource, '/ativos/<asset_id>')
    api.add_resource(EquipmentResource, '/ativos/equipamentos')
    api.add_resource(EquipmentCategoriesResource, '/ativos/categorias')

    api.add_resource(MiningComplexResource, '/complexos-minerarios')
    api.add_resource(MiningComplexItemResource, '/complexos-minerarios/<mining_complex_id>')
    api.add_resource(MiningComplexScheduleResource, '/complexos-minerarios/<mining_complex_id>/agenda')

    api.add_resource(MiningComplexEquipmentsResource, '/complexos-minerarios/equipamentos')
    api.add_resource(MiningComplexStructuresResource, '/complexos-minerarios/estruturas')

    app.register_blueprint(bp)
