from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate

from .config import config_by_name

db = SQLAlchemy()
flask_bcrypt = Bcrypt()
ma = Marshmallow()
migrate = Migrate()

def create_app(config_name):
    app = Flask('autism')
    app.config.from_object(config_by_name[config_name])
    ma.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    flask_bcrypt.init_app(app)

    return app