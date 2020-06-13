from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from py_app.app import create_app
from py_app.extensions.database import db, migrate

app = create_app()
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

manager = Manager(app)
manager.add_command('db', MigrateCommand)


# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(128))
import py_app.models.db


if __name__ == '__main__':
    manager.run()
