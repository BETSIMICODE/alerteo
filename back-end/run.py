from app import create_app
from app.routes.home import home  # Assurez-vous d'importer le blueprint


app = create_app()
app.register_blueprint(home, name='home_blueprint')  

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

