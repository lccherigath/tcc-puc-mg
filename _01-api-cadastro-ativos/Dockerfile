FROM python:3.8-buster

ENV FLASK_ENV development

# working directory
WORKDIR /app

# copy current directory into the container
ADD . /app

# install requirements
RUN pip3 install -r requirements.txt
RUN pip3 install gunicorn

# make port 8000 available to the world outside
EXPOSE 8000

# CMD ["gunicorn", "--config", "./gunicorn_config.py", "app:app"]
CMD ["gunicorn", "--config", "./gunicorn_config.py", "py_app.app:create_app"]
