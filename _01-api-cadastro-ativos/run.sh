echo "FLASK_ENV="
read flask_env

FLASK_ENV="$flask_env" FLASK_APP=app/app.py flask run
