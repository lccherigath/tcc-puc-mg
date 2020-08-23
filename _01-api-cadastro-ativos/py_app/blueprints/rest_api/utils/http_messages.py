# -*- coding: utf-8 -*-
from flask import request


def internal_error(error):
    message = {
        'status': 500,
        'message_user': 'Erro Interno do Servidor',
        'message_dev': str(error),
        'url': request.url
    }
    print('500 Internal Server Error: {}'.format(error))
    return message, 500


def not_found():
    message = {
        'status': 404,
        'message_user': 'Recurso não encontrado',
        # 'message_dev': 'Not Found <MOSTRAR O ERRO>',
        'message_dev': 'Not Found',
        'url': request.url
    }
    return message, 404


def bad_request(error=None):
    message = {
        'status': 400,
        'message_user': 'Solicitação Inválida',
        'url': request.url
    }
    if error:
        print('400 Bad Request: {}'.format(error))
        message['message_dev'] = str(error)
    return message, 400


def http_message(status, msg, id=None):
    message = {
        'status': status,
        'message': msg
    }
    message.update({'id': id} if id else {})
    return message, status
