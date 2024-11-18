from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

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

