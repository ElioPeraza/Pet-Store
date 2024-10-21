import cx_Oracle
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base  # Asegúrate de que tu modelo esté importado


# Configuración de la conexión a Oracle
def get_connection():
    try:
        connection = cx_Oracle.connect(
            user="USUARIO_ELIO",
            password="admin",  # Asegúrate de cerrar las comillas
            dsn="localhost:1521/XE"  # Reemplazar con tu DSN de Oracle
        )
        return connection
    except cx_Oracle.DatabaseError as e:
        error, = e.args
        print(f"Error al conectarse a la base de datos: {error.code} - {error.message}")
        return None

# Inicializa la base de datos
def init_db():
    try:
        engine = create_engine('oracle+cx_oracle://USUARIO_ELIO:admin@localhost:1521/XE')
        Base.metadata.create_all(engine)  # Crea las tablas en la base de datos
        Session = sessionmaker(bind=engine)
        return Session()  # Retorna una nueva sesión de la base de datos
    except Exception as e:
        print(f"Error al inicializar la base de datos: {e}")
        return None
