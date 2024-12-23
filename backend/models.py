from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Sequence


Base = declarative_base()

class Producto(Base):
    __tablename__ = 'productos'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(255), nullable=True)
    precio = Column(Float, nullable=False)
    tipo = Column(String(50), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "tipo": self.tipo
            
        }

class Usuario(Base):
    __tablename__ = 'USUARIOS'

    id_usuario = Column("ID_USUARIO", Integer, Sequence('id_usuario_seq'), primary_key=True)
    username = Column("USERNAME", String(50), nullable=False)
    password = Column("PASSWORD", String(100), nullable=False)
    email = Column("EMAIL", String(100), nullable=False, unique=True)

    def to_dict(self):
        return {
            "id_usuario": self.id_usuario,
            "username": self.username,
            "email": self.email,
        }