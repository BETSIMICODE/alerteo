import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

// Données des liens de navigation
const navLinks = [
  { name: "Accueil", href: "home" },
  { name: "Zone", href: "contact" },
  { name: "Sign-in", href: "sign-in" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture du menu mobile

  return (
    <nav className="fixed  top-0 left-0 w-full backdrop-blur-lg shadow-lg z-50 bg-[#191919]/90">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="/home"
          className="text-3xl font-extrabold text-[#C2E6FF] tracking-wide decoration-transparent"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Remplacez ce texte par votre logo */}
          
        </motion.a>

        {/* Liens Desktop */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              className="relative text-sm text-blue-gray-400 font-poppins hover:text-blue-gray-100 transition"
              whileHover={{ scale: 1.1 }}
            >
              {link.name}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-[#70B8FF] origin-left scale-x-0"
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Menu Burger */}
        <button
          className="md:hidden p-2 text-[#70B8FF] hover:text-white transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-[#191919] bg-opacity-95 flex flex-col space-y-4 px-6 py-4 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-[#70B8FF] text-lg font-semibold hover:text-white transition"
              onClick={() => setIsOpen(false)} // Ferme le menu après un clic
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;