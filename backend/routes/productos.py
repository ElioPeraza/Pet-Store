from flask import Blueprint, jsonify, request, g
from sqlalchemy.exc import SQLAlchemyError
from models import Producto
from . import database as db

productos_bp = Blueprint('productos', __name__)

def get_db_session():
    if 'db_session' not in g:
        g.db_session = db.init_db()
    return g.db_session

@productos_bp.teardown_app_request
def teardown_db_session(exception):
    session = g.pop('db_session', None)
    if session:
        if exception:
            session.rollback()
        session.close()

@productos_bp.route('/productos', methods=['GET'])
def get_productos():
    try:
        session = get_db_session()
        productos = session.query(Producto).all()
        return jsonify([producto.to_dict() for producto in productos])
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "Error al obtener productos", "error": str(e)}), 500

@productos_bp.route('/productos', methods=['POST'])
def add_producto():
    try:
        data = request.get_json()
        nuevo_producto = Producto(
            nombre=data['nombre'],
            descripcion=data.get('descripcion'),
            precio=data['precio']
        )
        session = get_db_session()
        session.add(nuevo_producto)
        session.commit()
        return jsonify(nuevo_producto.to_dict()), 201
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "Error al agregar producto", "error": str(e)}), 500

@productos_bp.route('/productos/<int:id>', methods=['GET'])
def get_producto(id):
    try:
        session = get_db_session()
        producto = session.query(Producto).filter(Producto.id == id).first()
        if producto:
            return jsonify(producto.to_dict())
        return jsonify({"message": "Producto no encontrado"}), 404
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "Error al obtener producto", "error": str(e)}), 500

@productos_bp.route('/productos/<int:id>', methods=['PUT'])
def update_producto(id):
    try:
        data = request.get_json()
        session = get_db_session()
        producto = session.query(Producto).filter(Producto.id == id).first()
        if producto:
            producto.nombre = data.get('nombre', producto.nombre)
            producto.descripcion = data.get('descripcion', producto.descripcion)
            producto.precio = data.get('precio', producto.precio)
            session.commit()
            return jsonify(producto.to_dict())
        return jsonify({"message": "Producto no encontrado"}), 404
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "Error al actualizar producto", "error": str(e)}), 500

@productos_bp.route('/productos/<int:id>', methods=['DELETE'])
def delete_producto(id):
    try:
        session = get_db_session()
        producto = session.query(Producto).filter(Producto.id == id).first()
        if producto:
            session.delete(producto)
            session.commit()
            return jsonify({"message": "Producto eliminado"})
        return jsonify({"message": "Producto no encontrado"}), 404
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "Error al eliminar producto", "error": str(e)}), 500
