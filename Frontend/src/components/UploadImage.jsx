import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import axios from 'axios'
const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");


  // Gérer le changement d’image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Supprimer l’image sélectionnée
  const removeImage = () => {
    setImage(null);
  };

  // Simuler l'upload
  const handleUpload = async () => {
    if (!image || !imageName) {
      alert("Veuillez remplir tous les champs !");
      return;
    }else{
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", imageName);
        
        try {
            axios.post(import.meta.env.VITE_EXPRESS_URL+"/api/maladie/add",formData)
            
        } catch (error) {
            console.log(error)
        } 
    }

    

    // Simuler une requête d’upload (à remplacer par ton API)
    console.log("Image envoyée :", { imageName, description, image });

    alert("Image uploadée avec succès !");
  };

  return (
    <div className="flex-1 max-w-lg mx-auto p-6 bg-[#004074] dark:bg-gray-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-100 dark:text-white text-center mb-4">
        Upload d'Image 
      </h2>

      {/* Champ Nom de l'Image */}
      <input
        type="text"
        placeholder="Nom de la maladie"
        value={imageName}
        onChange={(e) => setImageName(e.target.value)}
        className="w-full p-3 rounded-lg mb-3 bg-[#C2E6FF] text-blue-950"
      />

     

      {/* Zone d'Upload */}
      <label className="w-full border-dashed border-2 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-400 dark:hover:bg-gray-800 transition">
        <Upload size={40} className="text-gray-500" />
        <span className="text-gray-500 dark:text-gray-300 mt-2">
          Cliquez ou glissez une image ici
        </span>
        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      </label>

      {/* Prévisualisation de l'image */}
      {image && (
        <motion.div
          className="relative mt-4 w-full flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full rounded-lg shadow-md"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}

      {/* Bouton d'Upload */}
      <motion.button
        onClick={handleUpload}
        className="mt-5 w-full bg-cyan-950 text-white py-3 rounded-lg font-bold text-lg  hover:bg-blue-950 transition"
        whileTap={{ scale: 0.95 }}
      >
        Upload 
      </motion.button>
    </div>
  );
};

export default UploadImage;
