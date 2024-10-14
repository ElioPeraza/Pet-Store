from flask import Blueprint, jsonify, request, g
# from sqlalchemy.orm import Session
from models import Producto
from . import database as db

productos_bp = Blueprint('productos', __name__)

def get_db_session():
    if 'db_session' not in g:
        print('db_session antes de bdsession')
        g.db_session = db.init_db()
        print('despues de db session')
        
    return g.db_session

@productos_bp.route('/productos', methods=['GET'])
def get_productos():
    try:
        session = get_db_session()
        productos = session.query(Producto).all()
        return jsonify([producto.__dict__ for producto in productos if '_sa_instance_state' not in producto.__dict__])
    except Exception as e:
        return jsonify({"message": "Error al obtener productos", "error": str(e)}), 500

@productos_bp.route('/productos', methods=['POST'])
def add_producto():
    try:
        data = request.get_json()
        nuevo_producto = Producto(nombre=data['nombre'], descripcion=data.get('descripcion'), precio=data['precio'])
        session = get_db_session()
        session.add(nuevo_producto)
        session.commit()
        return jsonify({"message": "Producto agregado", "producto": nuevo_producto.__dict__}), 201
    except Exception as e:
        return jsonify({"message": "Error al agregar producto", "error": str(e)}), 500

@productos_bp.route('/productos/<int:id>', methods=['GET'])
def get_producto(id):
    try:
        session = get_db_session()
        producto = session.query(Producto).filter(Producto.id == id).first()
        if producto:
            return jsonify(producto.__dict__)
        return jsonify({"message": "Producto no encontrado"}), 404
    except Exception as e:
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
            return jsonify({"message": "Producto actualizado", "producto": producto.__dict__})
        return jsonify({"message": "Producto no encontrado"}), 404
    except Exception as e:
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
    except Exception as e:
        return jsonify({"message": "Error al eliminar producto", "error": str(e)}), 500
