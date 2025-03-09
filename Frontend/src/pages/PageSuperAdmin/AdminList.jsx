import DonutChart from '@/components/DonutChart';
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const AdminList = ({ admins }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredAdmins = admins.filter((admin) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            admin.name.toLowerCase().includes(searchLower) ||
            admin.email.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="max-w-5xl mx-auto p-8 relative">
            {/* Fond Dégradé & Animation */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-900 via-purple-800 to-teal-700 opacity-60 blur-3xl"></div>
            
            <div className="p-6 bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20">
                <h2 className="text-2xl font-bold text-white text-center mb-6">👑 Liste des Administrateurs</h2>

                {/* Barre de Recherche */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="🔍 Rechercher un administrateur..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full p-3 pl-12 rounded-full bg-white/20 text-white placeholder-gray-300 shadow-lg backdrop-blur focus:ring-2 focus:ring-blue-400 outline-none transition"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                </div>

                {/* Table avec Effet Neumorphisme */}
                <div className="overflow-hidden rounded-xl shadow-md">
                    <table className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg">
                        <thead>
                            <tr className="bg-white/20 text-white text-left">
                                <th className="py-4 px-6 text-lg font-semibold">Nom</th>
                                <th className="py-4 px-6 text-lg font-semibold">Email</th>
                                <th className="py-4 px-6 text-lg font-semibold">Délai Restant</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAdmins.map((admin) => {
                                const today = new Date();
                                const endDate = new Date(admin.contractEndDate);
                                const diffTime = endDate - today;
                                const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                return (
                                    <tr key={admin.id} className="border-b border-white/10 hover:bg-white/20 transition duration-300">
                                        <td className="py-4 px-6 flex items-center space-x-4">
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold shadow-lg">
                                                {admin.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-white font-medium">{admin.name}</span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-300">{admin.email}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-4">
                                                <DonutChart remainingDays={remainingDays} />
                                                <span className={`text-sm font-semibold px-4 py-2 rounded-full shadow-md ${
                                                    remainingDays <= 5 ? 'bg-red-500 text-white' :
                                                    remainingDays <= 15 ? 'bg-yellow-500 text-gray-900' :
                                                    'bg-green-500 text-white'
                                                }`}>
                                                    {remainingDays} jours
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminList;
