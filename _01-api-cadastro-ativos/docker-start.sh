#!/bin/sh
docker build . -t img_01-api-cadastro-ativos
docker run -itd --name api-cadastro-ativos --net=puc-mg-network --ip=172.25.0.4 --restart=always -p 8000:80 img_01-api-cadastro-ativos
