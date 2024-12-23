import cx_Oracle
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base  # Asegúrate de que tu modelo esté correctamente configurado



# Configuración de la conexión a Oracle
def get_connection():
    try:
        connection = cx_Oracle.connect(
            user="USUARIO_ELIO",
            password="admin",  
            dsn="localhost:1521/XE" 
        )
        return connection
    except cx_Oracle.DatabaseError as e:
        error, = e.args
        print(f"Error al conectarse a la base de datos: {error.code} - {error.message}")
        return None


# Inicializa la base de datos con SQLAlchemy
def init_db():
    try:
        # URI para conectar SQLAlchemy con Oracle
        engine = create_engine(
            'oracle+cx_oracle://USUARIO_ELIO:admin@localhost:1521/XE',
            echo=True  
        )

        # Crea las tablas definidas en los modelos si no existen
        Base.metadata.create_all(engine)

        # Configura una fábrica de sesiones
        Session = sessionmaker(bind=engine)
        return Session()  # Retorna una sesión para interactuar con la base de datos
    except Exception as e:
        print(f"Error al inicializar la base de datos: {e}")
        return None
def get_db_session():
    """Retorna una nueva sesión para interactuar con la base de datos."""
    try:
        return Session()
    except Exception as e:
        print(f"Error al crear la sesión de base de datos: {e}")
        return None