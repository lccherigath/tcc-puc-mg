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
    (complexo_minerario_id, ativo_id)
values
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18), (1, 19), (1, 20), (1, 21), (1, 22);

