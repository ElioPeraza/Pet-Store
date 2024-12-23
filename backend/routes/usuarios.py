from flask import Blueprint, jsonify, request, g
from models import Usuario  # Asegúrate de importar el modelo Usuario
from . import database as db
from sqlalchemy.sql import text

usuarios_bp = Blueprint('usuarios', __name__)

def get_db_session():
    if 'db_session' not in g:
        g.db_session = db.init_db()
    return g.db_session

# Obtener todos los usuarios
@usuarios_bp.route('/usuarios', methods=['GET'])
def get_usuarios():
    try:
        session = get_db_session()
        usuarios = session.query(Usuario).all()
        return jsonify([usuario.to_dict() for usuario in usuarios])
    except Exception as e:
        return jsonify({"message": "Error al obtener usuarios", "error": str(e)}), 500

# Crear un nuevo usuario
@usuarios_bp.route('/usuarios', methods=['POST'])
def add_usuario():
    try:
        data = request.get_json()

        # Obtén el siguiente valor de la secuencia usando `text()`
        session = get_db_session()
        nuevo_id = session.execute(text("SELECT id_usuario_seq.NEXTVAL FROM DUAL")).scalar()

        # Crea un nuevo usuario con el ID generado
        nuevo_usuario = Usuario(
            id_usuario=nuevo_id,  # Asignar el ID generado manualmente
            username=data['username'],
            password=data['password'],  # En producción, usa hashing aquí
            email=data['email']
        )

        session.add(nuevo_usuario)
        session.commit()

        return jsonify({"message": "Usuario creado", "usuario": nuevo_usuario.to_dict()}), 201

    except Exception as e:
        return jsonify({"message": "Error al crear usuario", "error": str(e)}), 500

# Obtener un usuario por ID
@usuarios_bp.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    try:
        session = get_db_session()
        usuario = session.query(Usuario).filter(Usuario.id_usuario == id).first()
        if usuario:
            return jsonify(usuario.to_dict())
        return jsonify({"message": "Usuario no encontrado"}), 404
    except Exception as e:
        return jsonify({"message": "Error al obtener usuario", "error": str(e)}), 500

# Actualizar un usuario
# Actualizar un usuario
@usuarios_bp.route('/usuarios/<int:id>', methods=['PUT'])
def update_usuario(id):
    try:
        data = request.get_json()
        session = get_db_session()
        usuario = session.query(Usuario).filter(Usuario.id_usuario == id).first()
        if usuario:
            # Actualiza los campos enviados en el body
            usuario.username = data.get('username', usuario.username)
            usuario.email = data.get('email', usuario.email)
            if 'password' in data:
                usuario.password = data['password']  # Asegúrate de manejar hashing aquí si necesario
            session.commit()

            return jsonify({"message": "Usuario actualizado", "usuario": usuario.to_dict()})
        return jsonify({"message": "Usuario no encontrado"}), 404
    except Exception as e:
        return jsonify({"message": "Error al actualizar usuario", "error": str(e)}), 500


# Eliminar un usuario
@usuarios_bp.route('/usuarios/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    try:
        session = get_db_session()
        usuario = session.query(Usuario).filter(Usuario.id_usuario == id).first()
        if usuario:
            session.delete(usuario)
            session.commit()
            return jsonify({"message": "Usuario eliminado"})
        return jsonify({"message": "Usuario no encontrado"}), 404
    except Exception as e:
        return jsonify({"message": "Error al eliminar usuario", "error": str(e)}), 500
    
@usuarios_bp.route('/usuarios/login', methods=['POST'])
def login_usuario():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        session = get_db_session()
        # Buscar el usuario por email
        usuario = session.query(Usuario).filter(Usuario.email == email).first()

        if usuario and usuario.password == password:
            return jsonify({"message": "Login exitoso", "usuario": usuario.to_dict()}), 200
        else:
            return jsonify({"message": "Correo o contraseña incorrectos"}), 401
    except Exception as e:
        return jsonify({"message": "Error al iniciar sesión", "error": str(e)}), 500  
