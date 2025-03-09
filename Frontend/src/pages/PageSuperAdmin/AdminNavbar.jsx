import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const handleUserIconClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    const handleLogoutClick = () => {
        setIsLogoutDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsLogoutDialogOpen(false);
    };

    const handleConfirmLogout = () => {
        navigate('/events');
        setIsLogoutDialogOpen(false);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header className="bg-gray-800 p-4 text-gray-100 fixed top-0 left-0 w-full z-40 shadow-xl border-b border-gray-700 h-16">
            <div className="container mx-auto flex justify-between items-center h-full">
                <div className="flex-grow">
                </div>
                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <FaBell className="text-2xl cursor-pointer text-gray-300 hover:text-gray-100 transition-colors" />
                        <span className="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-2 -translate-y-2 bg-red-500 rounded-full"></span>
                    </div>
                    <div className="relative">
                        <FaUserCircle
                            className="text-2xl cursor-pointer text-gray-300 hover:text-gray-100 transition-colors"
                            onClick={handleUserIconClick}
                        />
                        <ul
                            ref={menuRef}
                            className={`absolute right-0 mt-2 w-48 bg-gray-800 text-gray-100 shadow-2xl rounded-md ${isMenuOpen ? 'block' : 'hidden'}`}
                        >
                            <li className="hover:bg-gray-700 transition rounded-t-md">
                                <a className="block px-4 py-2">Profil</a>
                                {/* href="/" */}
                            </li>
                            <li className="hover:bg-gray-700 transition">
                                <a className="block px-4 py-2">Paramètres</a>
                            </li>
                            <li className="hover:bg-gray-700 transition rounded-b-md">
                                <button onClick={handleLogoutClick} className="block px-4 py-2 w-full text-left">Déconnexion</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {isLogoutDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl transform transition-transform duration-300 scale-100 ring-2 ring-gray-400">
                        <h2 className="text-xl text-center font-semibold text-white mb-4">Souhaitez-vous vraiment vous déconnecter ?</h2>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleConfirmLogout}
                                className="px-5 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-lg"
                            >
                                Oui
                            </button>
                            <button
                                onClick={handleCloseDialog}
                                className="px-5 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors shadow-lg"
                            >
                                Non
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default AdminNavbar;
