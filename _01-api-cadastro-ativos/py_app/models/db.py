# coding: utf-8
from sqlalchemy import Column, Date, ForeignKey, Integer, Numeric, SmallInteger, String, Text, UniqueConstraint
from sqlalchemy.schema import FetchedValue
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy

from py_app.extensions.database import db

# db = SQLAlchemy()



class Indicador(db.Model):
    __tablename__ = 'indicador'

    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(250), nullable=False)
    periodicidade = db.Column(db.SmallInteger, nullable=False)
    unidade = db.Column(db.String(5), nullable=False)
    url = db.Column(db.String(250))
    fonte = db.Column(db.Text, nullable=False)
    usuario_id = db.Column(db.ForeignKey('usuario.id', match='FULL'), nullable=False)

    usuario = db.relationship('Usuario', primaryjoin='Indicador.usuario_id == Usuario.id', backref='indicadors')



class Usuario(db.Model):
    __tablename__ = 'usuario'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    senha = db.Column(db.String(250), nullable=False)



class Valor(db.Model):
    __tablename__ = 'valor'
    __table_args__ = (
        db.UniqueConstraint('indicador_id', 'data_referencia', 'valor_indicador'),
    )

    id = db.Column(db.Integer, primary_key=True)
    indicador_id = db.Column(db.ForeignKey('indicador.id', match='FULL'))
    data_referencia = db.Column(db.Date)
    valor_indicador = db.Column(db.Numeric(17, 2), nullable=False)

    indicador = db.relationship('Indicador', primaryjoin='Valor.indicador_id == Indicador.id', backref='valors')
