# -*- coding: utf-8 -*-
from flask import request


def internal_error(error):
    mensagem = {
        'status': 500,
        'message_user': 'Erro Interno do Servidor',
        'message_dev': str(error),
        'url': request.url
    }
    print('500 Internal Server Error: {}'.format(error))
    return mensagem, 500


def not_found():
    mensagem = {
        'status': 404,
        'message_user': 'Recurso não encontrado',
        # 'message_dev': 'Not Found <MOSTRAR O ERRO>',
        'message_dev': 'Not Found',
        'url': request.url
    }
    return mensagem, 404


def bad_request(error=None):
    mensagem = {
        'status': 400,
        'message_user': 'Solicitação Inválida',
        'url': request.url
    }
    if error:
        print('400 Bad Request: {}'.format(error))
        mensagem['message_dev'] = str(error)
    return mensagem, 400


def http_message(status, msg, id=None):
    mensagem = {
        'status': status,
        'message': msg
    }
    mensagem.update({'id': id} if id else {})
    return mensagem, status
