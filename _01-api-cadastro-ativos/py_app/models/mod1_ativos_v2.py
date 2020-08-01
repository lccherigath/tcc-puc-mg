# coding: utf-8
from sqlalchemy import ARRAY, Boolean, CheckConstraint, Column, DateTime, Float, ForeignKey, ForeignKeyConstraint, Integer, Numeric, SmallInteger, String, Table, Text
from sqlalchemy.orm import relationship
from sqlalchemy.schema import FetchedValue
from geoalchemy2.types import Geometry
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()



class AssocAtivoComplexo(db.Model):
    __tablename__ = 'assoc_ativo_complexo'

    complexo_minerario_id = db.Column(db.ForeignKey('complexo_minerario.id', match='FULL'), primary_key=True, nullable=False)
    ativo_id = db.Column(db.ForeignKey('ativo.id', match='FULL'), primary_key=True, nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)

    ativo = db.relationship('Ativo', primaryjoin='AssocAtivoComplexo.ativo_id == Ativo.id', backref='assoc_ativo_complexoes')
    complexo_minerario = db.relationship('ComplexoMinerario', primaryjoin='AssocAtivoComplexo.complexo_minerario_id == ComplexoMinerario.id', backref='assoc_ativo_complexoes')



class Ativo(db.Model):
    __tablename__ = 'ativo'

    id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    descricao = db.Column(db.String(250), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    status = db.Column(db.SmallInteger, nullable=False, info='(0) Indisponível (1) Disponível')
    categoria_id = db.Column(db.ForeignKey('categoria.id', match='FULL'), nullable=False)

    categoria = db.relationship('Categoria', primaryjoin='Ativo.categoria_id == Categoria.id', backref='ativoes')



class Categoria(db.Model):
    __tablename__ = 'categoria'

    id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    nome = db.Column(db.String(250), nullable=False)
    status = db.Column(db.SmallInteger, nullable=False, info='(0) Indisponível (1) Disponível')



class ComplexoMinerario(db.Model):
    __tablename__ = 'complexo_minerario'

    id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    nome = db.Column(db.String(250))
    poligono = db.Column(db.Geometry('POLYGON', 4674, from_text='ST_GeomFromEWKT', name='geometry'))
    lat = db.Column(db.Numeric(17, 14), nullable=False)
    long = db.Column(db.Numeric(17, 14), nullable=False)
    uf = db.Column(db.String(2), nullable=False)
    municipio = db.Column(db.String(250), nullable=False)
    situacao_operacional = db.Column(db.SmallInteger, nullable=False, info='Situação operacional: (0) Em Construção (1) Em Operação (2) Desativada\n* Substitui o campo status')



class Estrutura(db.Model):
    __tablename__ = 'estrutura'

    id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    tipo = db.Column(db.String(250), nullable=False)
    descricao = db.Column(db.String(250))
    poligono = db.Column(db.Geometry('POLYGON', 4674, from_text='ST_GeomFromEWKT', name='geometry'))
    inserida_pnsb = db.Column(db.Boolean, nullable=False, info='Política Nacional de Segurança de Barragens')
    dpa = db.Column(db.SmallInteger, nullable=False, info='Dano Potencial Associado: (0) Nulo (1) Baixo (2) Médio (3) Alto')
    cri = db.Column(db.SmallInteger, nullable=False, info='Categoria de Risco: (0) Nulo (1) Baixo (2) Médio (3) Alto')
    paemb_url = db.Column(db.String(250), info='Plano de Ação de Emergência para Barragens de Mineração')
    nivel_emergencia = db.Column(db.SmallInteger, nullable=False, info='Níveis de emergência: 0, 1, 2, 3')
    situacao_operacional = db.Column(db.SmallInteger, nullable=False, info='Situação operacional: (0) Em Construção (1) Em Operação (2) Desativada\n* Substitui o campo status')
    complexo_minerario_id = db.Column(db.ForeignKey('complexo_minerario.id', match='FULL'), nullable=False)

    complexo_minerario = db.relationship('ComplexoMinerario', primaryjoin='Estrutura.complexo_minerario_id == ComplexoMinerario.id', backref='estruturas')



t_geography_columns = db.Table(
    'geography_columns',
    db.Column('f_table_catalog', db.String),
    db.Column('f_table_schema', db.String),
    db.Column('f_table_name', db.String),
    db.Column('f_geography_column', db.String),
    db.Column('coord_dimension', db.Integer),
    db.Column('srid', db.Integer),
    db.Column('type', db.Text)
)



t_geometry_columns = db.Table(
    'geometry_columns',
    db.Column('f_table_catalog', db.String(256)),
    db.Column('f_table_schema', db.String),
    db.Column('f_table_name', db.String),
    db.Column('f_geometry_column', db.String),
    db.Column('coord_dimension', db.Integer),
    db.Column('srid', db.Integer),
    db.Column('type', db.String(30))
)



class Manutencao(db.Model):
    __tablename__ = 'manutencao'
    __table_args__ = (
        db.ForeignKeyConstraint(['complexo_minerario_id', 'ativo_id'], ['assoc_ativo_complexo.complexo_minerario_id', 'assoc_ativo_complexo.ativo_id'], match='FULL'),
    )

    id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    descricao = db.Column(db.Text)
    data_hora = db.Column(db.DateTime, nullable=False)
    conclusao = db.Column(db.DateTime)
    complexo_minerario_id = db.Column(db.Integer, nullable=False)
    ativo_id = db.Column(db.Integer, nullable=False)

    complexo_minerario = db.relationship('AssocAtivoComplexo', primaryjoin='and_(Manutencao.complexo_minerario_id == AssocAtivoComplexo.complexo_minerario_id, Manutencao.ativo_id == AssocAtivoComplexo.ativo_id)', backref='manutencaos')



t_raster_columns = db.Table(
    'raster_columns',
    db.Column('r_table_catalog', db.String),
    db.Column('r_table_schema', db.String),
    db.Column('r_table_name', db.String),
    db.Column('r_raster_column', db.String),
    db.Column('srid', db.Integer),
    db.Column('scale_x', db.Float(53)),
    db.Column('scale_y', db.Float(53)),
    db.Column('blocksize_x', db.Integer),
    db.Column('blocksize_y', db.Integer),
    db.Column('same_alignment', db.Boolean),
    db.Column('regular_blocking', db.Boolean),
    db.Column('num_bands', db.Integer),
    db.Column('pixel_types', db.ARRAY(TEXT())),
    db.Column('nodata_values', db.ARRAY(DOUBLE_PRECISION(precision=53))),
    db.Column('out_db', db.Boolean),
    db.Column('extent', db.Geometry(from_text='ST_GeomFromEWKT', name='geometry')),
    db.Column('spatial_index', db.Boolean)
)



t_raster_overviews = db.Table(
    'raster_overviews',
    db.Column('o_table_catalog', db.String),
    db.Column('o_table_schema', db.String),
    db.Column('o_table_name', db.String),
    db.Column('o_raster_column', db.String),
    db.Column('r_table_catalog', db.String),
    db.Column('r_table_schema', db.String),
    db.Column('r_table_name', db.String),
    db.Column('r_raster_column', db.String),
    db.Column('overview_factor', db.Integer)
)



class SpatialRefSy(db.Model):
    __tablename__ = 'spatial_ref_sys'
    __table_args__ = (
        db.CheckConstraint('(srid > 0) AND (srid <= 998999)'),
    )

    srid = db.Column(db.Integer, primary_key=True)
    auth_name = db.Column(db.String(256))
    auth_srid = db.Column(db.Integer)
    srtext = db.Column(db.String(2048))
    proj4text = db.Column(db.String(2048))
