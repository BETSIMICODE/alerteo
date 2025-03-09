import React, { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { gsap } from "gsap";
import axios from "axios";
import { BiErrorCircle } from "react-icons/bi";


function VerificationModal({ serverCorrelationId, onClose }) {
    const modalRef = useRef(null);
    const [status, setStatus] = useState("pending"); // "pending", "success", "failed"
    const [attempts, setAttempts] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!serverCorrelationId) {
            setStatus("failed");
            setErrorMessage("Identifiant de transaction introuvable !");
            return;
        }

        gsap.fromTo(
            modalRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );

        const checkPaymentStatus = async () => {
            let attemptsCount = 0;
            const maxAttempts = 10;
            const interval = setInterval(async () => {
                attemptsCount++;
                setAttempts(attemptsCount);

                if (attemptsCount >= maxAttempts) {
                    clearInterval(interval);
                    setStatus("failed");
                    return;
                }

                try {
                    const response = await axios.get(`${import.meta.env.VITE_EXPRESS_URL}/api/mvola/status/${serverCorrelationId}`);
                    
                    console.log("Vérification du paiement :", response.data);
                    
                    if (response.data.status === "completed") {
                        setStatus("success");
                        clearInterval(interval);
                    }
                } catch (error) {
                    console.error("Erreur lors de la vérification :", error);
                    // setErrorMessage("Erreur réseau ou API indisponible !");
                }
            }, 5000); // Vérification toutes les 10 secondes

            return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage
        };

        checkPaymentStatus();
    }, [serverCorrelationId]);

    return (
        <div className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity">
            <div ref={modalRef} className="relative bg-white shadow-xl rounded-lg p-6 w-96 transform transition-all">
                
                {/* Bouton de fermeture */}
                <button className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition" onClick={onClose}>
                    <IoIosClose size={30} />
                </button>

                <h2 className="text-xl font-bold text-center mb-4">Vérification du Paiement</h2>

                {/* Affichage du statut */}
                <div className="text-center">
                    {status === "pending" && (
                        <>
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 mx-auto mb-4"></div>
                            <p className="text-gray-700">Vérification en cours...</p>
                            
                        </>
                    )}
                    {status === "success" && (
                        <p className="text-green-500 font-semibold text-lg">✅ Paiement réussi !</p>
                    )}
                    {status === "failed" && (
                        <p className="text-red-500 font-semibold text-lg"><BiErrorCircle/> Paiement échoué.</p>
                    )}
                </div>

                {/* Affichage des erreurs */}
                {errorMessage && <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>}

                {/* Bouton OK */}
                <div className="flex justify-center mt-6">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition" onClick={onClose}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VerificationModal;
