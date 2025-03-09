import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosClose } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiTwotoneAlert } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function Modal({ setIsModalOpen }) {
    const [data, setData] = useState({
        symptomes: [],
        longitude: 0.0,
        latitude: 0.0,
        nom: '',
        prenom: '',
        age: '',
        duree: 0,
    });
    const [showPopup, setShowPopup] = useState(false); // Contrôler l'affichage du popup
    const [popupMessage, setPopupMessage] = useState("En attente de réponse..."); // Message dynamique
    const [estimatedArrival, setEstimatedArrival] = useState(null); // Estimation de l'arrivée
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setData(prevData => ({
                    ...prevData,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }));
            },
            (error) => console.error("Erreur de localisation :", error)
        );
    }, []);

    const addSymptom = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            setData(prevData => ({
                ...prevData,
                symptomes: [...prevData.symptomes, inputValue]
            }));
            setInputValue('');
            e.preventDefault();
        }
    };

    const removeSymptom = (index) => {
        setData(prevData => ({
            ...prevData,
            symptomes: prevData.symptomes.filter((_, i) => i !== index)
        }));
    };

    const handleAlerteo = async () => {
        try {
            // Envoi de la requête POST
            const res = await axios.post(import.meta.env.VITE_EXPRESS_URL + "/api/alerts/", data);
            
            // Afficher la pop-up de "en attente de réponse"
            setShowPopup(true);
            setPopupMessage("En attente de réponse...");

            const estimation = res.data.estimatedArrival; // Estimation de l'arrivée
const centre_name = res.data.nearestCentre.nom; // Nom du centre le plus proche
console.log(res.data);

// Ferme le modal
// setIsModalOpen(false);
setShowPopup(true);

// Simuler un délai d'attente ou mettre à jour immédiatement la pop-up
setTimeout(() => {
    setPopupMessage(`Ne vous inquiétez plus, l'ambulance de "${centre_name}" va vous prendre en charge. Elle arrivera approximativement dans ${estimation} minutes.`);
}, 6000); // 2 secondes après la réponse


        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
            setShowPopup(true);
            setPopupMessage("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    const closePopup = () => {
        setShowPopup(false);
            setIsModalOpen(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center font-poppins z-50 gap-4 bg-black bg-opacity-60 backdrop-blur-md">
            <div className="relative bg-white bg-opacity-95 p-6 rounded-2xl shadow-2xl max-w-lg w-full transition-all transform scale-95 animate-fadeIn">
                
                {/* Bouton Fermer */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-transform transform hover:scale-125"
                    onClick={() => setIsModalOpen(false)}
                >
                    <IoIosClose size={40} />
                </button>

                {/* Titre avec icône */}
                <h2 className="text-3xl font-bold text-center text-gray-800 flex justify-center items-center gap-3">
                    <AiTwotoneAlert className="text-red-600 text-4xl animate-pulse" />
                    <span className="text-gray-900">a<span className="text-red-600 text-4xl animate-bounce">!</span>erte</span>
                </h2>

                {/* Formulaire */}
                <form className="mt-6 space-y-4">
                    
                    {/* Symptômes */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Symptômes</label>
                        <div className="flex flex-wrap gap-2">
                            {data.symptomes.map((symptom, index) => (
                                <div key={index} className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm shadow">
                                    {symptom}
                                    <button
                                        type="button"
                                        className="ml-2 text-gray-500 hover:text-red-500"
                                        onClick={() => removeSymptom(index)}
                                    >
                                        <IoIosClose size={18} />
                                    </button>
                                </div>
                            ))}
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                                placeholder="Ajoutez un symptôme et appuyez sur Entrée"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={addSymptom}
                            />
                        </div>
                    </div>

                    {/* Informations personnelles */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                            placeholder="Nom"
                            value={data.nom}
                            onChange={(e) => setData({ ...data, nom: e.target.value })}
                        />
                        <input
                            type="text"
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                            placeholder="Prénom"
                            value={data.prenom}
                            onChange={(e) => setData({ ...data, prenom: e.target.value })}
                        />
                    </div>

                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                        placeholder="Âge"
                        value={data.age}
                        onChange={(e) => setData({ ...data, age: e.target.value })}
                    />

                    {/* Durée */}
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                        placeholder="Durée des symptômes (en heures)"
                        value={data.duree}
                        onChange={(e) => setData({ ...data, duree: e.target.value })}
                    />

                    {/* Coordonnées */}
                    <div className="text-gray-600 text-sm flex flex-col gap-1">
                        <p className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-500" /> Longitude : <span className="font-semibold">{data.longitude}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-500" /> Latitude : <span className="font-semibold">{data.latitude}</span>
                        </p>
                    </div>

                    {/* Bouton Envoyer */}
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all transform hover:scale-105 shadow-md"
                            onClick={handleAlerteo}
                        >
                            <AiTwotoneAlert className="text-xl animate-pulse" />
                            Envoyer l'Alerte
                        </button>
                    </div>
                </form>

                {/* Pop-up d'attente ou résultat */}
                {showPopup && (
    <div className="popup fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 backdrop-blur-md">
        <div className="popup-content bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
            <div className="text-center">
                {/* Icône rassurante */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto w-16 h-16 text-blue-500 mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.04 0-2 .96-2 2s.96 2 2 2 2-.96 2-2-.96-2-2-2zm0 4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zM12 3a9 9 0 00-9 9v2a2 2 0 001 1.73l4.8 2.57a8.89 8.89 0 003.2.47 8.89 8.89 0 003.2-.47l4.8-2.57a2 2 0 001-1.73V12a9 9 0 00-9-9z" />
                </svg>

                {/* Message rassurant */}
                <p className="text-xl font-medium text-gray-700">{popupMessage}</p>
                <p className="text-sm text-gray-500 mt-2">Nous faisons tout notre possible pour vous venir en aide.</p>
            </div>
            <div className="flex justify-center mt-6">
            {popupMessage!=='En attente de réponse...'&& (
                <button
                    onClick={closePopup}
                    className="w-28 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all transform hover:scale-105"
                >
                    OK
                </button>
            )}
            </div>
        </div>
    </div>
)}

            </div>
        </div>
    );
}

export default Modal;
