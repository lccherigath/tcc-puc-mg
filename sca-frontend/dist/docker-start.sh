#!/bin/sh
docker build . -t img_sca-frontend
docker run -itd --name sca-frontend --net=puc-mg-network --ip=172.25.0.3 --restart=always img_sca-frontend
