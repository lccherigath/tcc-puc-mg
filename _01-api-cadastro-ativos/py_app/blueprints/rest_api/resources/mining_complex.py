# -*- coding: utf-8 -*-
from flask import abort, request
from flask_restful import Resource
from py_app.models.mod1_ativos import ComplexoMinerario, Estrutura, AssocAtivoComplexo, Ativo, Manutencao
from py_app.blueprints.rest_api.utils import http_messages

from datetime import datetime

from py_app.extensions.database import db

import pika
from dynaconf import settings
from json import dumps


class MiningComplexResource(Resource):
    def get(self):
        return list_mining_complex()

    def post(self):
        try:
            r = request.json

            mining_complex = ComplexoMinerario(
              nome=r['nome'].title() if r['nome'] else None,
              lat=r['lat_long'][0],
              long=r['lat_long'][1],
              uf=r['uf'],
              municipio=r['municipio'],
              situacao_operacional=r['situacao_operacional'],
            )

            for s in r['estruturas']:
                structure = Estrutura(
                    tipo=s['tipo'],
                    descricao=s['descricao'].title() if s['descricao'] else None,
                    inserida_pnsb=s['inserida_pnsb'],
                    dpa=s['dpa'],
                    cri=s['cri'],
                    paemb_url=s['paemb_url'],
                    nivel_emergencia=s['nivel_emergencia'],
                    situacao_operacional=s['situacao_operacional']
                )
                mining_complex.estruturas.append(structure)

            for a in r['ativos']:
                quantity = a['qt']
                asset_id = a['assetId']
                asset_to_update = Ativo.query.get(asset_id);
                if asset_to_update.quantidade < quantity:
                    return http_messages.http_message(400, f'{asset_to_update.descricao} (ID {asset_to_update.id}) não possui quantidade suficiente.')
                asset_to_update.quantidade -= quantity
                asset = AssocAtivoComplexo(
                    ativo_id=asset_id,
                    quantidade=quantity
                )
                mining_complex.assoc_ativo_complexos.append(asset)

            db.session.add(mining_complex)
            db.session.commit()
            db.session.refresh(mining_complex)

            send_info_to_queue({
                'id': mining_complex.id,
                'nome': mining_complex.nome,
                'situacao_operacional': mining_complex.situacao_operacional
            })

            return http_messages.http_message(201, 'Created', mining_complex.id)
        except Exception as e:
            print(e)
            return http_messages.bad_request(e)


class MiningComplexItemResource(Resource):
    def get(self, mining_complex_id):
        return list_mining_complex(mining_complex_id)

    def put(self):
        pass

    def delete(self):
        pass


class MiningComplexScheduleResource(Resource):
    def get(self, mining_complex_id):
        try:
            mining_complex = ComplexoMinerario.query.filter_by(id=mining_complex_id).first()
            if not mining_complex:
                return http_messages.not_found()
            return mining_complex.to_dict(complete=True, schedule=True), 200
        except Exception as e:
            return http_messages.internal_error(e)

    def post(self, mining_complex_id):
        try:
            r = request.json
            start_date = datetime.strptime(r['data_hora'], '%Y-%m-%dT%H:%M')
            if start_date < datetime.now():
                return http_messages.http_message(400, 'O evento não pode ser marcado para um período passado.')

            end_date = datetime.strptime(r['conclusao'], '%Y-%m-%dT%H:%M') if r['conclusao'] else None
            if end_date and end_date < start_date:
                return http_messages.http_message(400, 'A data final não pode ser anterior à data inicial.')

            description = r['descricao'].title() if r['descricao'] else None
            asset_id = r['ativo_id']
            if r['id']:
                maintenance = Manutencao.query.get(r['id'])
                if not maintenance:
                    return http_messages.bad_request()
                maintenance.descricao = description
                maintenance.data_hora = start_date
                maintenance.conclusao = end_date
                maintenance.ativo_id = asset_id
            else:
                maintenance = Manutencao(
                    descricao=description,
                    data_hora=start_date,
                    conclusao=end_date,
                    ativo_id=asset_id,
                    complexo_minerario_id=mining_complex_id
                )
                db.session.add(maintenance)
            db.session.commit()
            return http_messages.http_message(200, 'OK')
        except Exception as e:
            print(e)
            return http_messages.bad_request(e)



class MiningComplexEquipmentsResource(Resource):
    def patch(self):
        try:
            r = request.json
            asset_id = r['assetId']
            update_quantity = r['qt']
            mining_complex_id = r['miningComplexId']

            asset_to_update = Ativo.query.get(asset_id);
            asset = AssocAtivoComplexo.query.filter_by(
                complexo_minerario_id=mining_complex_id,
                ativo_id=asset_id
            ).first()
            if asset:
                if update_quantity == 0:
                    asset_to_update.quantidade += asset.quantidade
                    db.session.delete(asset)
                elif update_quantity > asset.ativo.quantidade:
                    return http_messages.http_message(400, f'{asset_to_update.descricao} (ID {asset_to_update.id}) não possui quantidade suficiente.')
                else:
                    asset_to_update.quantidade += asset.quantidade
                    asset.quantidade = update_quantity
                    asset_to_update.quantidade -= update_quantity
            else:
                asset = AssocAtivoComplexo(
                    complexo_minerario_id=mining_complex_id,
                    ativo_id=asset_id,
                    quantidade=update_quantity
                )
                db.session.add(asset)
            db.session.commit()
            return http_messages.http_message(200, 'OK')
        except Exception as e:
            print(e)
            return http_messages.bad_request(e)


class MiningComplexStructuresResource(Resource):

    def post(self):
        try:
            r = request.json

            structure = Estrutura(
                tipo=r['tipo'],
                descricao=r['descricao'].title() if r['descricao'] else None,
                inserida_pnsb=r['inserida_pnsb'],
                dpa=r['dpa'],
                cri=r['cri'],
                paemb_url=r['paemb_url'],
                nivel_emergencia=r['nivel_emergencia'],
                situacao_operacional=r['situacao_operacional'],
                complexo_minerario_id=r['complexo_minerario_id']
            )

            db.session.add(structure)
            db.session.commit()
            db.session.refresh(structure)
            return http_messages.http_message(201, 'Created', structure.id)
        except Exception as e:
          return http_messages.bad_request(e)

    def patch(self):
        try:
            r = request.json

            structure_to_update = Estrutura.query.get(r['id'])

            if structure_to_update:
                structure_to_update.tipo = r['tipo']
                structure_to_update.descricao = r['descricao'].title() if r['descricao'] else None,
                structure_to_update.inserida_pnsb = r['inserida_pnsb']
                structure_to_update.dpa = r['dpa']
                structure_to_update.cri = r['cri']
                structure_to_update.paemb_url = r['paemb_url']
                structure_to_update.nivel_emergencia = r['nivel_emergencia']
                structure_to_update.situacao_operacional = r['situacao_operacional']

                db.session.commit()
                return http_messages.http_message(200, 'OK')
            return http_messages.not_found()
        except Exception as e:
            return http_messages.bad_request(e)



def list_mining_complex(id=None):
    try:
        if id:
            mining_complex = ComplexoMinerario.query.filter_by(id=id).first()
            if not mining_complex:
                return http_messages.not_found()
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
        return http_messages.internal_error(e)


def send_info_to_queue(data):
    try:
        connection = pika.BlockingConnection(
            pika.URLParameters(settings.RABBITMQ_URI)
        )
        data_dumps = dumps(data)

        channel = connection.channel()

        channel.queue_declare(queue='mining-complex-queue', durable=True)

        channel.basic_publish(
            exchange='amq.direct',
            routing_key='mining_complex_rk',
            body=data_dumps
        )
        print(f" [x] Enviando dados para a fila... {data_dumps}")
        connection.close()
    except Exception as e:
        print('Dados não enviados para a fila.')
        print(e)
