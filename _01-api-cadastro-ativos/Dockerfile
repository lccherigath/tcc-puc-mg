FROM python:3.8-buster
LABEL maintainer 'lccherigath@gmail.com'

ENV FLASK_ENV production

# working directory
WORKDIR /app

# copy current directory into the container
ADD requirements.txt /app/requirements.txt

# install requirements
RUN pip3 install -r requirements.txt
RUN pip3 install gunicorn
