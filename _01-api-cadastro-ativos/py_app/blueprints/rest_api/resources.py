# -*- coding: utf-8 -*-
from flask_restful import Resource

class HelloWorldResource(Resource):
    def get(self):
        """
        This is the language awesomeness API
        Call this api passing a language name and get back its features
        ---
        tags:
        - Awesomeness Language API
        parameters:
        - name: language
            in: path
            type: string
            required: true
            description: The language name
        - name: size
            in: query
            type: integer
            description: size of awesomeness
        responses:
        500:
            description: Error The language is not awesome!
        200:
            description: A language with its awesomeness
            schema:
            id: awesome
            properties:
                language:
                type: string
                description: The language name
                default: Lua
                features:
                type: array
                description: The awesomeness list
                items:
                    type: string
                default: ["perfect", "simple", "lovely"]

        """
        # products = Products.query.all() or abort(204)
        return ['hello', 'world']

class HelloWorldItemResource(Resource):
    def get(self, resource_id):
        # product = Products.query.filter_by(id=resource_id).first() or abort(404)
        return {'hello': 'world'}
