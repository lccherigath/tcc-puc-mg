-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: ---


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: new_database | type: DATABASE --
-- -- DROP DATABASE IF EXISTS new_database;
-- CREATE DATABASE new_database;
-- -- ddl-end --
-- 

-- object: public.complexo_minerario | type: TABLE --
-- DROP TABLE IF EXISTS public.complexo_minerario CASCADE;
CREATE TABLE public.complexo_minerario (
	id integer NOT NULL,
	nome varchar(250) NOT NULL,
	situacao_operacional smallint NOT NULL,
	CONSTRAINT complexo_minerario_pk PRIMARY KEY (id)

);
-- ddl-end --
COMMENT ON COLUMN public.complexo_minerario.situacao_operacional IS E'Situação operacional: (0) Em Construção (1) Em Operação (2) Desativada\n* Substitui o campo status';
-- ddl-end --
-- ALTER TABLE public.complexo_minerario OWNER TO postgres;
-- ddl-end --

-- object: public.familia | type: TABLE --
-- DROP TABLE IF EXISTS public.familia CASCADE;
CREATE TABLE public.familia (
	id serial NOT NULL,
	endereco varchar(250) NOT NULL,
	cep varchar(8) NOT NULL,
	lat decimal(17,14) NOT NULL,
	long decimal(17,14) NOT NULL,
	telefone varchar(11) NOT NULL,
	status smallint NOT NULL,
	complexo_minerario_id integer NOT NULL,
	CONSTRAINT familia_pk PRIMARY KEY (id)

);
-- ddl-end --
COMMENT ON COLUMN public.familia.status IS E'(0) Inativo (1) Ativo';
-- ddl-end --
-- ALTER TABLE public.familia OWNER TO postgres;
-- ddl-end --

-- object: public.morador | type: TABLE --
-- DROP TABLE IF EXISTS public.morador CASCADE;
CREATE TABLE public.morador (
	id serial NOT NULL,
	nome varchar(250) NOT NULL,
	cpf varchar(11),
	email varchar(250),
	telefone varchar(11),
	familia_id integer NOT NULL,
	CONSTRAINT morador_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.morador OWNER TO postgres;
-- ddl-end --

-- object: public.evento | type: TABLE --
-- DROP TABLE IF EXISTS public.evento CASCADE;
CREATE TABLE public.evento (
	id serial NOT NULL,
	tipo smallint NOT NULL,
	descricao varchar(250) NOT NULL,
	ata text,
	data timestamp NOT NULL,
	complexo_minerario_id integer NOT NULL,
	CONSTRAINT evento_pk PRIMARY KEY (id)

);
-- ddl-end --
COMMENT ON COLUMN public.evento.tipo IS E'(1) Simulação ou (2) Reunião';
-- ddl-end --
-- ALTER TABLE public.evento OWNER TO postgres;
-- ddl-end --

-- object: public.plano_evacuacao | type: TABLE --
-- DROP TABLE IF EXISTS public.plano_evacuacao CASCADE;
CREATE TABLE public.plano_evacuacao (
	id serial NOT NULL,
	descricao varchar(250) NOT NULL,
	url_documento varchar(250) NOT NULL,
	data_criacao timestamp NOT NULL,
	data_atualizacao timestamp,
	complexo_minerario_id integer NOT NULL,
	CONSTRAINT evento_pk_cp PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.plano_evacuacao OWNER TO postgres;
-- ddl-end --

-- object: public.emergencia | type: TABLE --
-- DROP TABLE IF EXISTS public.emergencia CASCADE;
CREATE TABLE public.emergencia (
	id serial NOT NULL,
	descricao varchar(250) NOT NULL,
	data timestamp NOT NULL,
	dano_potencial smallint NOT NULL,
	risco smallint NOT NULL,
	nivel_emergencia smallint NOT NULL,
	estrutura_id integer NOT NULL,
	CONSTRAINT evento_pk_cp PRIMARY KEY (id)

);
-- ddl-end --
COMMENT ON COLUMN public.emergencia.dano_potencial IS E'(0) Nulo (1) Baixo (2) Médio (3) Alto';
-- ddl-end --
COMMENT ON COLUMN public.emergencia.risco IS E'(0) Nulo (1) Baixo (2) Médio (3) Alto';
-- ddl-end --
COMMENT ON COLUMN public.emergencia.nivel_emergencia IS E'(0) Nulo (1) Baixo (2) Médio (3) Alto';
-- ddl-end --
-- ALTER TABLE public.emergencia OWNER TO postgres;
-- ddl-end --

-- object: public.estrutura | type: TABLE --
-- DROP TABLE IF EXISTS public.estrutura CASCADE;
CREATE TABLE public.estrutura (
	id integer NOT NULL,
	tipo varchar(250) NOT NULL,
	situacao_operacional smallint NOT NULL,
	complexo_minerario_id integer NOT NULL,
	CONSTRAINT estrutura_pk PRIMARY KEY (id)

);
-- ddl-end --
COMMENT ON COLUMN public.estrutura.situacao_operacional IS E'Situação operacional: (0) Em Construção (1) Em Operação (2) Desativada\n* Substitui o campo status';
-- ddl-end --
-- ALTER TABLE public.estrutura OWNER TO postgres;
-- ddl-end --

-- object: complexo_minerario_fk | type: CONSTRAINT --
-- ALTER TABLE public.familia DROP CONSTRAINT IF EXISTS complexo_minerario_fk CASCADE;
ALTER TABLE public.familia ADD CONSTRAINT complexo_minerario_fk FOREIGN KEY (complexo_minerario_id)
REFERENCES public.complexo_minerario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: familia_fk | type: CONSTRAINT --
-- ALTER TABLE public.morador DROP CONSTRAINT IF EXISTS familia_fk CASCADE;
ALTER TABLE public.morador ADD CONSTRAINT familia_fk FOREIGN KEY (familia_id)
REFERENCES public.familia (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: complexo_minerario_fk | type: CONSTRAINT --
-- ALTER TABLE public.evento DROP CONSTRAINT IF EXISTS complexo_minerario_fk CASCADE;
ALTER TABLE public.evento ADD CONSTRAINT complexo_minerario_fk FOREIGN KEY (complexo_minerario_id)
REFERENCES public.complexo_minerario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: complexo_minerario_fk_cp | type: CONSTRAINT --
-- ALTER TABLE public.plano_evacuacao DROP CONSTRAINT IF EXISTS complexo_minerario_fk_cp CASCADE;
ALTER TABLE public.plano_evacuacao ADD CONSTRAINT complexo_minerario_fk_cp FOREIGN KEY (complexo_minerario_id)
REFERENCES public.complexo_minerario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: estrutura_fk | type: CONSTRAINT --
-- ALTER TABLE public.emergencia DROP CONSTRAINT IF EXISTS estrutura_fk CASCADE;
ALTER TABLE public.emergencia ADD CONSTRAINT estrutura_fk FOREIGN KEY (estrutura_id)
REFERENCES public.estrutura (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: complexo_minerario_fk | type: CONSTRAINT --
-- ALTER TABLE public.estrutura DROP CONSTRAINT IF EXISTS complexo_minerario_fk CASCADE;
ALTER TABLE public.estrutura ADD CONSTRAINT complexo_minerario_fk FOREIGN KEY (complexo_minerario_id)
REFERENCES public.complexo_minerario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


