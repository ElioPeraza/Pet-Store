from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Producto(Base):
    __tablename__ = 'productos'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(255))
    precio = Column(Integer, nullable=False)

    def __repr__(self):
        return f"<Producto(id={self.id}, nombre={self.nombre}, precio={self.precio})>"

