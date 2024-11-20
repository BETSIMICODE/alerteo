import sqlite3
from app.config import get_db_connection

class Society:
    @staticmethod
    def create_table_if_not_exists():
        """
        Vérifie si la table `society` existe, et la crée si elle n'existe pas.
        """
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS society (
                id_society INTEGER PRIMARY KEY AUTOINCREMENT,
                name_society TEXT NOT NULL,
                description_society TEXT,
                tel_society TEXT,
                mail_society TEXT NOT NULL UNIQUE,
                password_society TEXT NOT NULL,
                location_society TEXT,
                photo_society TEXT
            )
        ''')

        connection.commit()
        connection.close()

    @staticmethod
    def newSociety(name, description, tel, mail, password, location, photo):
        """
        Ajoute une nouvelle société avec les informations fournies.
        """
        Society.create_table_if_not_exists()

        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute('''
            INSERT INTO society (name_society, description_society, tel_society, mail_society, password_society, location_society, photo_society)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (name, description, tel, mail, password, location, photo))

        connection.commit()
        connection.close()

    @staticmethod
    def showSocietyById(id_society):
        """
        Affiche une société par son ID.
        """
        Society.create_table_if_not_exists()

        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT id_society, name_society, description_society, tel_society, mail_society, location_society, photo_society FROM society WHERE id_society = ?', (id_society,))
        society = cursor.fetchone()

        connection.close()

        if society:
            return {
                "id_society": society[0],
                "name_society": society[1],
                "description_society": society[2],
                "tel_society": society[3],
                "mail_society": society[4],
                "location_society": society[5],
                "photo_society": society[6]
            }
        else:
            return None

    @staticmethod
    def showSocietyByMail(mail_society):
        """
        Affiche une société par son email.
        """
        Society.create_table_if_not_exists()

        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT id_society, name_society, description_society, tel_society, mail_society, location_society, photo_society FROM society WHERE mail_society = ?', (mail_society,))
        society = cursor.fetchone()

        connection.close()

        if society:
            return {
                "id_society": society[0],
                "name_society": society[1],
                "description_society": society[2],
                "tel_society": society[3],
                "mail_society": society[4],
                "location_society": society[5],
                "photo_society": society[6]
            }
        else:
            return None

    @staticmethod
    def editSociety(id_society, name=None, description=None, tel=None, mail=None, password=None, location=None, photo=None):
        """
        Modifie les informations d'une société spécifiée par id_society.
        Seuls les champs non nuls seront mis à jour.
        """
        Society.create_table_if_not_exists()

        connection = get_db_connection()
        cursor = connection.cursor()

        if name:
            cursor.execute('UPDATE society SET name_society = ? WHERE id_society = ?', (name, id_society))
        if description:
            cursor.execute('UPDATE society SET description_society = ? WHERE id_society = ?', (description, id_society))
        if tel:
            cursor.execute('UPDATE society SET tel_society = ? WHERE id_society = ?', (tel, id_society))
        if mail:
            cursor.execute('UPDATE society SET mail_society = ? WHERE id_society = ?', (mail, id_society))
        if password:
            cursor.execute('UPDATE society SET password_society = ? WHERE id_society = ?', (password, id_society))
        if location:
            cursor.execute('UPDATE society SET location_society = ? WHERE id_society = ?', (location, id_society))
        if photo:
            cursor.execute('UPDATE society SET photo_society = ? WHERE id_society = ?', (photo, id_society))

        connection.commit()
        connection.close()

    @staticmethod
    def deleteSociety(id_society):
        """
        Supprime une société spécifiée par id_society.
        """
        Society.create_table_if_not_exists()

        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute('DELETE FROM society WHERE id_society = ?', (id_society,))
        connection.commit()
        connection.close()

    @staticmethod
    def searchSociety(name=None, description=None, tel=None, mail=None, location=None, photo=None):
        """
        Recherche des sociétés dynamiquement en fonction des critères fournis.
        """
        Society.create_table_if_not_exists()

        connection = get_db_connection()
        cursor = connection.cursor()

        query = 'SELECT id_society, name_society, description_society, tel_society, mail_society, location_society, photo_society FROM society WHERE 1=1'
        params = []

        if name:
            query += ' AND name_society LIKE ?'
            params.append(f"%{name}%")
        if description:
            query += ' AND description_society LIKE ?'
            params.append(f"%{description}%")
        if tel:
            query += ' AND tel_society LIKE ?'
            params.append(f"%{tel}%")
        if mail:
            query += ' AND mail_society LIKE ?'
            params.append(f"%{mail}%")
        if location:
            query += ' AND location_society LIKE ?'
            params.append(f"%{location}%")
        if photo:
            query += ' AND photo_society LIKE ?'
            params.append(f"%{photo}%")

        cursor.execute(query, tuple(params))
        societies = cursor.fetchall()

        connection.close()

        societies_list = [{"id_society": society[0], "name_society": society[1], "description_society": society[2],
                           "tel_society": society[3], "mail_society": society[4],
                           "location_society": society[5], "photo_society": society[6]} for society in societies]

        return societies_list
    
    @staticmethod
    def showAllSociety():
        """
        Affiche toutes les sociétés sans leur mot de passe.
        """
        # Vérifie si la table existe
        Society.create_table_if_not_exists()

        connection = get_db_connection()
        cursor = connection.cursor()

        # Exécute la requête pour récupérer toutes les sociétés
        cursor.execute('SELECT id_society, name_society, description_society, tel_society, mail_society, location_society, photo_society FROM society')
        societies = cursor.fetchall()

        connection.close()

        # Ajoutez une instruction de débogage ici
        print("Sociétés récupérées :", societies)

        # Convertit les tuples en dictionnaires pour une meilleure lisibilité
        societies_list = [{"id_society": society[0], "name_society": society[1], "description_society": society[2], 
                           "tel_society": society[3], "mail_society": society[4],
                           "location_society": society[5], "photo_society": society[6]} for society in societies]

        return societies_list

# Exemple d'utilisation
if __name__ == "__main__":
    # Création de la table society
    Society.create_table_if_not_exists()

    # # Ajout d'une nouvelle société
    Society.newSociety(name="Jirama", description="Société semi-privée qui gère l'éléctricité et l'eau", tel="0209016671", mail="contactjirama@jirama.com", password="hello", location="Fianarantsoa", photo="path_to_photo.jpg")
    Society.newSociety(name="Commune Urbaine Fianarantsoa", description="Responsable de la ville de Fianarantsoa", tel="261341234190", mail="contactcuf@cufianarantsoa.com", password="hello", location="Fianarantsoa", photo="path_to_photo.jpg")
    Society.newSociety(name="Université de Fianarantsoa", description="Université publique de Fianarantsoa", tel="0205678643", mail="univ-fianar@univfianarantsoa.com", password="hello", location="Fianarantsoa", photo="path_to_photo.jpg")
    Society.newSociety(name="Pompier Fianarantsoa", description="Pompier responsable des accident de Fianarantsoa ", tel="113", mail="cufpompier@cufianarantsoa.com", password="hello", location="Fianarantsoa", photo="path_to_photo.jpg")

    # Affichage d'une société par son ID
    # society = Society.showSocietyById(1)
    # print(society)

    # Recherche dynamique de sociétés
    # search_results = Society.searchSociety(name="Jirama")
    # print(search_results)
    print(Society.showAllSociety())
