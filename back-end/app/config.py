import sqlite3
import os

# Nom de la base de données
DB_NAME = "alerteo.sqlite"

def get_db_connection():
    """
    Se connecte à la base de données SQLite.
    Crée la base de données si elle n'existe pas encore.
    """
    # Vérifie si le fichier de la base de données existe
    db_exists = os.path.isfile(DB_NAME)

    # Connexion à la base de données
    connection = sqlite3.connect(DB_NAME)

    if not db_exists:
        print(f"Base de données '{DB_NAME}' créée avec succès.")
    else:
        print(f"Connexion à la base de données '{DB_NAME}' réussie.")

    return connection
# if __name__ == "__main__":
#     conn = get_db_connection()
#     # Votre code pour manipuler la base de données...
#     conn.close()