import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
function ButtonRetour() {
  const navigate = useNavigate(); // Hook de navigation

  const handleClick = () => {
    navigate(-1); // Retourner à la page précédente
  };

  return (
    <div className="flex justify-center align-middle mt-2">


    <button
      onClick={handleClick}
      className="bg-gradient-to-r gap-3 font-bold from-blue-500 inline-flex to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      <FaArrowLeft size={20}/>Retour
    </button>
    </div>
  );
}

export default ButtonRetour;
