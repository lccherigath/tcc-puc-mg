insert into categoria values (default, 'Acessórios', 1);
insert into categoria values (default, 'Automação', 1);
insert into categoria values (default, 'Bombas e Tubulações', 1);
insert into categoria values (default, 'Britagem e Transportador por Correia', 1);
insert into categoria values (default, 'Combustíveis', 1);
insert into categoria values (default, 'Comunicação e Tradução', 1);
insert into categoria values (default, 'Construções e Estruturas Civis', 1);
insert into categoria values (default, 'Consultoria Econômica', 1);
insert into categoria values (default, 'Consultoria Técnica', 1);
insert into categoria values (default, 'Consumíveis e Insumos', 1);
insert into categoria values (default, 'Equipamento Elétrico', 1);
insert into categoria values (default, 'Escavação e Carregamento', 1);
insert into categoria values (default, 'Exploração', 1);
insert into categoria values (default, 'Fabricação de Metais, Plásticos e Peças', 1);
insert into categoria values (default, 'Financeiro e Gestão', 1);
insert into categoria values (default, 'Geologia', 1);
insert into categoria values (default, 'Geotecnia', 1);
insert into categoria values (default, 'Geração e Gestão de Energia', 1);
insert into categoria values (default, 'Gestão de Água', 1);
insert into categoria values (default, 'Impermeabilização e Controle de Poeira', 1);

insert into ativo (descricao, quantidade, status, categoria_id) values('Trator D8T', 50, 1, 12);
insert into ativo (descricao, quantidade, status, categoria_id) values('Trator D9R', 50, 1, 12);
insert into ativo (descricao, quantidade, status, categoria_id) values('Trator D11T/D11T CD', 50, 1, 12);
insert into ativo (descricao, quantidade, status, categoria_id) values('Caminhão articulado de três eixos 725C2', 50, 1, 12);
insert into ativo (descricao, quantidade, status, categoria_id) values('Caminhão articulado de três eixos 740 EJ', 50, 1, 12);
insert into ativo (descricao, quantidade, status, categoria_id) values('Perfuratriz giratória MD6200', 50, 1, 12);
insert into ativo (descricao, quantidade, status, categoria_id) values('Dragline 8750', 50, 1, 12);
insert into ativo (descricao, quantidade, status, categoria_id) values('Carregadeira subterrânea R1300G', 50, 1, 12);
insert into ativo (descricao, quantidade, status, categoria_id) values('Britador Metso', 50, 1, 4);
insert into ativo (descricao, quantidade, status, categoria_id) values('Britador Rhodax', 50, 1, 4);
insert into ativo (descricao, quantidade, status, categoria_id) values('Filtro esteira à vácuo', 50, 1, 4);
insert into ativo (descricao, quantidade, status, categoria_id) values('Filtro mesa', 50, 1, 4);
insert into ativo (descricao, quantidade, status, categoria_id) values('Bomba Peristáltica', 50, 1, 3);
insert into ativo (descricao, quantidade, status, categoria_id) values('FURNSTAR Automacão de Fornos de Redução', 50, 1, 2);
insert into ativo (descricao, quantidade, status, categoria_id) values('Otimizador de Floculante', 50, 1, 2);
insert into ativo (descricao, quantidade, status, categoria_id) values('Luvas Exotérmicas e Isolantes', 50000, 1, 10);
insert into ativo (descricao, quantidade, status, categoria_id) values('Grafite Carburante', 985641, 1, 10);
insert into ativo (descricao, quantidade, status, categoria_id) values('Vedabox cordão para vedação', 4523186, 1, 10);
insert into ativo (descricao, quantidade, status, categoria_id) values('Tinta refratárias a base de álcool', 55480, 1, 10);
insert into ativo (descricao, quantidade, status, categoria_id) values('Argila Creme', 5577420, 1, 10);
insert into ativo (descricao, quantidade, status, categoria_id) values('Fluorita britada grau metalúrgico', 507574, 1, 10);
insert into ativo (descricao, quantidade, status, categoria_id) values('Óx Alumínio', 57520, 1, 10);

insert into complexo_minerario
    (nome, poligono, lat, long, uf, municipio, situacao_operacional)
values('Córrego do Feijão', null, -20.1328144, -44.1328689, 'MG', 'Brumadinho', 1);

insert into estrutura
    (tipo, descricao, poligono, inserida_pnsb, dpa, cri, paemb_url, nivel_emergencia, situacao_operacional, complexo_minerario_id)
values
('Barragem', null, null, true, 3, 3, null, 3, 1, 1),
('Mina', null, null, false, 3, 3, null, 2, 1, 1),
('Mina', 'Mina desativada', null, false, 3, 3, null, 2, 2, 1),
('Estrutura de apoio', 'Terminal', null, false, 3, 3, null, 2, 1, 1);

insert into assoc_ativo_complexo
    (complexo_minerario_id, ativo_id, quantidade)
values
(1, 1, 6), (1, 2, 5), (1, 3, 7), (1, 4, 8), (1, 5, 9), (1, 6, 10), (1, 7, 11), (1, 8, 12), (1, 9, 5), (1, 10, 6), (1, 11, 7), (1, 12, 8), (1, 13, 9), (1, 14, 10), (1, 15, 11), (1, 16, 12), (1, 17, 13), (1, 18, 14), (1, 19, 15), (1, 20, 4), (1, 21, 3), (1, 22, 2);

insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('Cadam S.A.', NULL, -0.893666666666667, -52.3789708333333, 'AP', 'Vitória do Jari', 1);
insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('Catalao', NULL, -18.1508408333333, -47.7821363888889, 'GO', 'Ouvidor', 1);
insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('Niobras Mineração Ltda', NULL, -18.14625, -47.8058890277778, 'GO', 'Ouvidor', 1);
insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('J. G. de A. FERREIRA MINERADORA EIRELI', NULL, -6.58219444444444, -43.9662222222222, 'MA', 'Pastos Bons', 1);
insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('Mosaic Fertilizantes P&K S.A. Filial: Araxa', NULL, -19.6413527777778, -46.9738497222222, 'MG', 'Araxá', 1);
insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('Mineração Usiminas S.A.', NULL, -20.1253333333333, -44.4104722222222, 'MG', 'Mateus Leme', 1);
insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('Mineração Corumbaense Reunida Sa', NULL, -19.1919383333334, -57.6141859722223, 'MS', 'Corumbá', 1);
insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('Alta Floresta Gold Mineração Ltda.', NULL, -10.8024861111111, -55.1861555555556, 'MT', 'Nova Santa Helena', 1);
insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('Avb Mineração Ltda.', NULL, -6.24496527777778, -49.7465663888889, 'PA', 'Curionópolis', 1);
insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('White Solder Metalurgia e Mineração - Sol Nascente', NULL, -9.62227777777778, -63.0608611111111, 'RO', 'Rio Crespo', 1);
insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('Cooperativa Mineradora dos Garimpeiros de Ariquemes', NULL, -11.1485833333333, -62.4274722222223, 'RO', 'Urupá', 1);
insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('Gabriella Mineração Ltda', NULL, -28.5772777777778, -49.4421944444444, 'SC', 'Siderópolis', 1);
insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('Uilson Romanha & Cia Ltda', NULL, -23.6590833333333, -48.0013988888889, 'SP', 'Itapetininga', 1);
insert into complexo_minerario (nome,poligono,lat,long,uf,municipio,situacao_operacional)
    values ('Geominas Minerações Ltda.', NULL, -11.6493277777778, -47.6761777777778, 'TO', 'Natividade', 1);
