import React, { useState, useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";
import gsap from "gsap";

const ListImages = ({ images }) => {
  const [localImages, setLocalImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const imagesRef = useRef([]);

  // Met à jour localImages lorsque images change
  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  // Fonction pour supprimer une image
  const handleDelete = (id) => {
    setLocalImages(localImages.filter((image) => image.id !== id));
  };

  // Calculer l'index de la première et de la dernière image à afficher
  const indexOfLastImage = currentPage * itemsPerPage;
  const indexOfFirstImage = indexOfLastImage - itemsPerPage;
  const currentImages = localImages.slice(indexOfFirstImage, indexOfLastImage);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(localImages.length / itemsPerPage);

  // Fonction de pagination avec animation GSAP
  const paginate = (pageNumber) => {
    if (pageNumber === currentPage) return; // Éviter les changements inutiles
    gsap.fromTo(
      imagesRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
      },
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.4,
        onComplete: () => {
          setCurrentPage(pageNumber); // Changer la page après l'animation
        },
      }
    );
  };

  // Animation de la transition des images
  useEffect(() => {
    gsap.fromTo(
      imagesRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
      }
    );
  }, [currentPage]);

  return (
    <div className="flex-1 max-w-3xl mx-auto p-6 bg-[#182449] dark:bg-gray-900 rounded-2xl shadow-lime-100">
      <h2 className="text-2xl font-bold text-blue-200 dark:text-white text-center mb-6">
        Liste des Images Uploadées
      </h2>

      <div>
        {localImages.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Aucune image trouvée.</p>
        ) : (
          <div>
            <div ref={imagesRef}>
              {currentImages.map((image) => (
                <div
                  key={image.id}
                  className="flex items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-all"
                >
                  <img
                    src={import.meta.env.VITE_EXPRESS_URL + image.image_url}
                    alt={image.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-md"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {image.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{image.description}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {localImages.length > itemsPerPage && (
              <div className="mt-6 flex justify-center space-x-3">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50 transition"
                >
                  Précédent
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`p-2 rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'} transition`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50 transition"
                >
                  Suivant
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListImages;
