from flask import Flask, g
from routes.productos import productos_bp
from flask_cors import CORS
from routes.usuarios import usuarios_bp
# from backend.routes.database import init_db, get_connection



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


# @app.before_request
# def before_request():
#     pass# g.db_session = init_db()  # Inicializa la sesión antes de cada solicitud

@app.teardown_request
def teardown_request(exception):
    db_session = g.pop('db_session', None)
    if db_session is not None:
        db_session.close()  # Cierra la sesión al finalizar la solicitud

@app.route('/')
def home():
    return "Bienvenido a la API de Pet Store"
    

# Registrar el blueprint
app.register_blueprint(productos_bp)
app.register_blueprint(usuarios_bp)

if __name__ == '__main__':
    app.run(debug=True)
