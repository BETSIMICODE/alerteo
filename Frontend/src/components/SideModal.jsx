import React, { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { gsap } from "gsap";
import axios from "axios";
import VerificationModal from "./VerificationModal";

function SideModal({ isOpen, setIsOpen }) {
    const modalRef = useRef(null);
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [serverCorrelationId, setServerCorrelationId] = useState(null);
    const [isVerificationOpen, setIsVerificationOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            gsap.to(modalRef.current, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
        } else {
            gsap.to(modalRef.current, { x: "100%", opacity: 0, duration: 0.3, ease: "power2.in" });
        }
    }, [isOpen]);

    const handlePayment = async () => {
        if (!phone || !amount) {
            setError("Veuillez remplir tous les champs !");
            return;
        }

        setError(""); // Réinitialise l'erreur avant de soumettre

        try {
            const res = await axios.post(import.meta.env.VITE_EXPRESS_URL + "/api/mvola/pay", {
                montant: amount,
                numero: phone
            });

            if (res.data.serverCorrelationId) {
                setServerCorrelationId(res.data.serverCorrelationId);
                setIsVerificationOpen(true); // Ouvrir la fenêtre de vérification
            }
        } catch (error) {
            console.error("Erreur de paiement :", error);
            setError("Une erreur est survenue. Veuillez réessayer !");
        }
    };

    return (
        <>
            <div className={`fixed inset-0 flex z-50 justify-end font-poppins bg-black bg-opacity-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div
                    ref={modalRef}
                    className="w-96 h-full bg-white shadow-xl p-6 transform translate-x-full "
                >
                    {/* Bouton de fermeture */}
                    <button className="absolute top-4 right-4 text-black hover:text-gray-500 transition" onClick={() => setIsOpen(false)}>
                        <IoIosClose size={35} />
                    </button>

                    {/* Titre stylisé */}
                    <div className="flex justify-center">

                    <img src="img/mvola.png" alt="" className="w-20" />
                    </div>
                    <h2 className="mt- text-2xl font-semibold text-gray-900 text-center mb-6">Paiement MVola</h2>

                    {/* Formulaire de paiement */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2">Numéro MVola</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 bg-transparent text-gray-800 placeholder-gray-500 rounded-lg mb-4"
                            placeholder="034xxxxxxx"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <label className="text-gray-700 font-medium mb-2">Montant (Ar)</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 bg-transparent text-gray-800 placeholder-gray-500 rounded-lg mb-4"
                            placeholder="1000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <button 
    className="w-full bg-gradient-to-r from-yellow-400 to-black text-white py-3 rounded-lg hover:opacity-90 transition"
    onClick={handlePayment}
>
    Confirmer le paiement
</button>


                    </div>
                </div>
            </div>

            {/* Modale de vérification après paiement */}
            {isVerificationOpen && (
                <VerificationModal
                    serverCorrelationId={serverCorrelationId}
                    onClose={() => setIsVerificationOpen(false)}
                />
            )}
        </>
    );
}

export default SideModal;
