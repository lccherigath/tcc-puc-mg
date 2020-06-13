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

-- object: public.ativo | type: TABLE --
-- DROP TABLE IF EXISTS public.ativo CASCADE;
CREATE TABLE public.ativo (
	id serial NOT NULL,
	descricao varchar(250) NOT NULL,
	quantidade integer NOT NULL,
	categoria_id integer NOT NULL,
	CONSTRAINT ativo_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ativo OWNER TO postgres;
-- ddl-end --

-- object: public.categoria | type: TABLE --
-- DROP TABLE IF EXISTS public.categoria CASCADE;
CREATE TABLE public.categoria (
	id serial NOT NULL,
	nome varchar(250) NOT NULL,
	CONSTRAINT categoria_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.categoria OWNER TO postgres;
-- ddl-end --

-- object: public.manutencao | type: TABLE --
-- DROP TABLE IF EXISTS public.manutencao CASCADE;
CREATE TABLE public.manutencao (
	id serial NOT NULL,
	data_hora timestamp NOT NULL,
	conclusao timestamp,
	complexo_minerario_id integer NOT NULL,
	ativo_id integer NOT NULL,
	CONSTRAINT manutencao_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.manutencao OWNER TO postgres;
-- ddl-end --

-- object: public.complexo_minerario | type: TABLE --
-- DROP TABLE IF EXISTS public.complexo_minerario CASCADE;
CREATE TABLE public.complexo_minerario (
	id serial NOT NULL,
	nome varchar(250),
	poligono geometry(POLYGON, 4674),
	lat decimal(17,14) NOT NULL,
	long decimal(17,14) NOT NULL,
	uf varchar(2) NOT NULL,
	municipio varchar(250) NOT NULL,
	CONSTRAINT complexo_minerario_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.complexo_minerario OWNER TO postgres;
-- ddl-end --

-- object: public.estrutura | type: TABLE --
-- DROP TABLE IF EXISTS public.estrutura CASCADE;
CREATE TABLE public.estrutura (
	id serial NOT NULL,
	tipo varchar(250) NOT NULL,
	descricao varchar(250),
	poligono geometry(POLYGON, 4674),
	inserida_pnsb boolean NOT NULL,
	dpa smallint NOT NULL,
	cri smallint NOT NULL,
	paemb_url smallint,
	nivel_emergencia smallint NOT NULL,
	situacao_operacional smallint NOT NULL,
	complexo_minerario_id integer NOT NULL,
	CONSTRAINT estrutura_pk PRIMARY KEY (id)

);
-- ddl-end --
COMMENT ON COLUMN public.estrutura.inserida_pnsb IS E'Política Nacional de Segurança de Barragens';
-- ddl-end --
COMMENT ON COLUMN public.estrutura.dpa IS E'Dano Potencial Associado: (0) Nulo (1) Baixo (2) Médio (3) Alto';
-- ddl-end --
COMMENT ON COLUMN public.estrutura.cri IS E'Categoria de Risco: (0) Nulo (1) Baixo (2) Médio (3) Alto';
-- ddl-end --
COMMENT ON COLUMN public.estrutura.paemb_url IS E'Plano de Ação de Emergência para Barragens de Mineração';
-- ddl-end --
COMMENT ON COLUMN public.estrutura.nivel_emergencia IS E'Níveis de emergência: 0, 1, 2, 3';
-- ddl-end --
COMMENT ON COLUMN public.estrutura.situacao_operacional IS E'Situação operacional: (0) Em Construção (1) Em Operação (2) Desativada';
-- ddl-end --
-- ALTER TABLE public.estrutura OWNER TO postgres;
-- ddl-end --

-- object: public.assoc_ativo_complexo | type: TABLE --
-- DROP TABLE IF EXISTS public.assoc_ativo_complexo CASCADE;
CREATE TABLE public.assoc_ativo_complexo (
	complexo_minerario_id integer NOT NULL,
	ativo_id integer NOT NULL,
	CONSTRAINT assoc_ativo_complexo_pk PRIMARY KEY (complexo_minerario_id,ativo_id)

);
-- ddl-end --
-- ALTER TABLE public.assoc_ativo_complexo OWNER TO postgres;
-- ddl-end --

-- object: categoria_fk | type: CONSTRAINT --
-- ALTER TABLE public.ativo DROP CONSTRAINT IF EXISTS categoria_fk CASCADE;
ALTER TABLE public.ativo ADD CONSTRAINT categoria_fk FOREIGN KEY (categoria_id)
REFERENCES public.categoria (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: assoc_ativo_complexo_fk | type: CONSTRAINT --
-- ALTER TABLE public.manutencao DROP CONSTRAINT IF EXISTS assoc_ativo_complexo_fk CASCADE;
ALTER TABLE public.manutencao ADD CONSTRAINT assoc_ativo_complexo_fk FOREIGN KEY (complexo_minerario_id,ativo_id)
REFERENCES public.assoc_ativo_complexo (complexo_minerario_id,ativo_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: complexo_minerario_fk | type: CONSTRAINT --
-- ALTER TABLE public.estrutura DROP CONSTRAINT IF EXISTS complexo_minerario_fk CASCADE;
ALTER TABLE public.estrutura ADD CONSTRAINT complexo_minerario_fk FOREIGN KEY (complexo_minerario_id)
REFERENCES public.complexo_minerario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: complexo_minerario_fk | type: CONSTRAINT --
-- ALTER TABLE public.assoc_ativo_complexo DROP CONSTRAINT IF EXISTS complexo_minerario_fk CASCADE;
ALTER TABLE public.assoc_ativo_complexo ADD CONSTRAINT complexo_minerario_fk FOREIGN KEY (complexo_minerario_id)
REFERENCES public.complexo_minerario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: ativo_fk | type: CONSTRAINT --
-- ALTER TABLE public.assoc_ativo_complexo DROP CONSTRAINT IF EXISTS ativo_fk CASCADE;
ALTER TABLE public.assoc_ativo_complexo ADD CONSTRAINT ativo_fk FOREIGN KEY (ativo_id)
REFERENCES public.ativo (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


