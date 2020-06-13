# -*- coding: utf-8 -*-

# from app.config.db_connection import Session
import app.utils.error_handler as error_handler
import app.utils.general_functions as util

from flask import request, Response, jsonify, json


class DictFormat():

  def to_dict(self):
    return {c.name: getattr(self, c.name) for c in self.__table__.columns}


# def insert_object(new_object):
#     session = Session()
#     try:
#         session.add(new_object)
#         session.commit()
#         session.refresh(new_object)
#         return util.http_message(201, 'Created', new_object.id)
#     except Exception as e:
#         return error_handler.internal_error(e, session)
#     finally:
#         session.close()


# def delete_object(obj, session):
#     if obj:
#         try:
#             session.delete(obj)
#             session.commit()
#             return util.http_message(200, 'OK')
#         except Exception as e:
#             return util.http_message(403, 'Operação não permitida')
#     return error_handler.not_found()


'''
def lista_produtos(id=None):
    session = Session()
    try:
        if id:
            produto = session.query(Produto).get(id)
            if produto == None:
                return util.not_found()
            retorno = produto.to_dict()            
        else:
            produtos = session.query(Produto).all()
            retorno = {
                'count': len(produtos),
                'next': None,
                'previous': None,
                'results': [produto.to_dict() for produto in produtos]
            }
        return jsonify(retorno), 200
    except Exception as e:
        return util.internal_error(e)
    finally:
        session.close()


def atualiza_produto(id, produto):
    session = Session()
    try:
        session.query(Produto).filter(Produto.id==id).update({
            Produto.nome: produto.nome,
            Produto.descricao: produto.descricao,
            Produto.tags: produto.tags
        }, synchronize_session=False)
        session.commit()
        return util.http_message(200, 'OK')
    except Exception as e:
        return util.internal_error(e, session)
    finally:
        session.close()


def remove_produto(id):
    session = Session()
    try:
        obj = session.query(Produto).filter(Produto.id==id).first()
        return remove_objeto(obj, session)
    except Exception as e:
        return util.internal_error(e, session)
    finally:
        session.close()
'''