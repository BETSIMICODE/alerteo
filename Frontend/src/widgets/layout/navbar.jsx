// src/components/Navbar.js
import { useState } from "react"; // Importation de useState pour gérer l'état du menu mobile
import { Link } from "react-router-dom"; // Utilise react-router-dom pour la navigation
import Logo from "../../../public/img/logo.jpeg"; // Assure-toi que le chemin de l'image est correct

const Navbar = () => {
  // Créer un état pour gérer l'affichage du menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour basculer l'état du menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4 shadow-md font-poppins"> {/* Applique la police Poppins */}
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo et Titre */}
        <div className="flex items-center space-x-4">
          <img
            src={Logo} // Utilisation de l'image logo
            alt="Logo"
            className="h-20 w-30" // Taille du logo
          />
          <Link to="/" className="text-white text-lg font-bold">
            {/* Titre de l'application */}
          </Link>
        </div>

        {/* Menu de navigation pour les écrans larges */}
        <div className="hidden md:flex space-x-6">
          <Link to="/home" className="text-white hover:text-blue-400">
            Accueil
          </Link>
          <Link to="/contact" className="text-white hover:text-blue-400">
            Contact
          </Link>
          <Link to="/sign-in" className="text-white hover:text-blue-400">
            Sign-in
          </Link>
          <Link to="/sign-up" className="text-white hover:text-blue-400">
            Sign-up
          </Link>
        </div>

        {/* Bouton mobile */}
        <button 
          onClick={toggleMenu} // Changer l'état du menu mobile au clic
          className="text-white md:hidden"
        >
          <i className="fas fa-bars"></i> {/* Icône menu mobile (FontAwesome) */}
        </button>
      </div>

      {/* Menu mobile */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col space-y-4 p-4">
          <Link to="/home" className="text-white hover:text-blue-400">
            Accueil
          </Link>
          <Link to="/contact" className="text-white hover:text-blue-400">
            Contact
          </Link>
          <Link to="/sign-in" className="text-white hover:text-blue-400">
            Sign-in
          </Link>
          <Link to="/sign-up" className="text-white hover:text-blue-400">
            Sign-up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
