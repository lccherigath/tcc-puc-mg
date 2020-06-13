pip install flask \
dynaconf \
flask_restful \
Flask-SQLAlchemy \
Flask-Migrate \
flask_script \
flask-sqlacodegen \
psycopg2-binary \
flask-cors \
flasgger \
GeoAlchemy2 \


flask-sqlacodegen postgresql://user:pass@host/db_name --flask --outfile db.py

python manage.py db init
python manage.py db migrate
python manage.py db upgrade
python manage.py db --help
# ERROR [root] Error: Target database is not up to date.
# to make the current the same
python manage.py db stamp head


LOGS
SWAGGER
AUTH
PAGINAÇÃO