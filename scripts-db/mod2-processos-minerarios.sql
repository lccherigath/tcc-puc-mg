CREATE DATABASE db_processos_minerarios;
\c db_processos_minerarios
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

-- object: public.fluxo_trabalho | type: TABLE --
-- DROP TABLE IF EXISTS public.fluxo_trabalho CASCADE;
CREATE TABLE public.fluxo_trabalho (
	id serial NOT NULL,
	descricao varchar(250) NOT NULL,
	data_inicio timestamp NOT NULL,
	data_fim timestamp,
	complexo_minerario_id integer NOT NULL,
	CONSTRAINT fluxo_trabalho_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.fluxo_trabalho OWNER TO postgres;
-- ddl-end --

-- object: public.tarefa | type: TABLE --
-- DROP TABLE IF EXISTS public.tarefa CASCADE;
CREATE TABLE public.tarefa (
	id serial NOT NULL,
	descricao varchar(250) NOT NULL,
	data_inicio timestamp NOT NULL,
	data_fim timestamp,
	prioridade smallint NOT NULL,
	fluxo_trabalho_id integer NOT NULL,
	CONSTRAINT tarefa_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.tarefa OWNER TO postgres;
-- ddl-end --

-- object: public.informe | type: TABLE --
-- DROP TABLE IF EXISTS public.informe CASCADE;
CREATE TABLE public.informe (
	id serial NOT NULL,
	descricao varchar(250) NOT NULL,
	data timestamp NOT NULL,
	tarefa_id integer NOT NULL,
	CONSTRAINT fluxo_trabalho_pk_cp PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.informe OWNER TO postgres;
-- ddl-end --

-- object: public.produto | type: TABLE --
-- DROP TABLE IF EXISTS public.produto CASCADE;
CREATE TABLE public.produto (
	id serial NOT NULL,
	nome varchar(250) NOT NULL,
	status smallint NOT NULL,
	CONSTRAINT produto_pk PRIMARY KEY (id)

);
-- ddl-end --
COMMENT ON COLUMN public.produto.status IS E'(0) Indisponível (1) Disponível';
-- ddl-end --
-- ALTER TABLE public.produto OWNER TO postgres;
-- ddl-end --

-- object: public.liberacao_producao | type: TABLE --
-- DROP TABLE IF EXISTS public.liberacao_producao CASCADE;
CREATE TABLE public.liberacao_producao (
	complexo_minerario_id integer NOT NULL,
	produto_id integer NOT NULL,
	valor_tonelada decimal(17,2) NOT NULL,
	quantidade_tonelada decimal(17,3) NOT NULL,
	data timestamp NOT NULL,
	CONSTRAINT liberacao_producao_pk PRIMARY KEY (complexo_minerario_id,produto_id)

);
-- ddl-end --
-- ALTER TABLE public.liberacao_producao OWNER TO postgres;
-- ddl-end --

-- object: complexo_minerario_fk | type: CONSTRAINT --
-- ALTER TABLE public.fluxo_trabalho DROP CONSTRAINT IF EXISTS complexo_minerario_fk CASCADE;
ALTER TABLE public.fluxo_trabalho ADD CONSTRAINT complexo_minerario_fk FOREIGN KEY (complexo_minerario_id)
REFERENCES public.complexo_minerario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fluxo_trabalho_fk | type: CONSTRAINT --
-- ALTER TABLE public.tarefa DROP CONSTRAINT IF EXISTS fluxo_trabalho_fk CASCADE;
ALTER TABLE public.tarefa ADD CONSTRAINT fluxo_trabalho_fk FOREIGN KEY (fluxo_trabalho_id)
REFERENCES public.fluxo_trabalho (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: tarefa_fk | type: CONSTRAINT --
-- ALTER TABLE public.informe DROP CONSTRAINT IF EXISTS tarefa_fk CASCADE;
ALTER TABLE public.informe ADD CONSTRAINT tarefa_fk FOREIGN KEY (tarefa_id)
REFERENCES public.tarefa (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: complexo_minerario_fk | type: CONSTRAINT --
-- ALTER TABLE public.liberacao_producao DROP CONSTRAINT IF EXISTS complexo_minerario_fk CASCADE;
ALTER TABLE public.liberacao_producao ADD CONSTRAINT complexo_minerario_fk FOREIGN KEY (complexo_minerario_id)
REFERENCES public.complexo_minerario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: produto_fk | type: CONSTRAINT --
-- ALTER TABLE public.liberacao_producao DROP CONSTRAINT IF EXISTS produto_fk CASCADE;
ALTER TABLE public.liberacao_producao ADD CONSTRAINT produto_fk FOREIGN KEY (produto_id)
REFERENCES public.produto (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


