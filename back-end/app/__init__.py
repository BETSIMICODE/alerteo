import os
from flask import Flask
from app.config import get_db_connection
from dotenv import load_dotenv
from app.routes.home import home  # Assurez-vous que vous importez bien le blueprint 'home'

load_dotenv()  # Charge les variables d'environnement depuis .env

def create_app():
    app = Flask(__name__)
    app.secret_key = os.getenv("SECRET_KEY", "ede65843056004919c9e4d6d40ca60ec")  # Utilise la clé depuis .env ou une clé par défaut

    # Configuration de la base de données
    app.get_db_connection = get_db_connection

    # Enregistrement des blueprints
    app.register_blueprint(home, url_prefix='/home')

    return app
