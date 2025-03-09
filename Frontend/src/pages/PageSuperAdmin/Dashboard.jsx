import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaMoneyBillWave, FaUsers, FaUserShield } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const adminData = [
  {
    id: 1,
    name: 'Admin',
    email: 'adminService2202@gmail.com',
    monthlyReservations: [2, 4, 3, 8, 7, 10, 9, 13, 11, 14, 12, 16],
  },
  {
    id: 2,
    name: 'Admin 2',
    email: 'admin2@gmail.com',
    monthlyReservations: [5, 10, 8, 6, 10, 13, 4, 5, 8, 4, 7, 10],
  },
  {
    id: 3,
    name: 'Admin 3',
    email: 'admin3@gmail.com',
    monthlyReservations: [1, 3, 4, 7, 6, 9, 8, 11, 10, 15, 14, 18],
  },
];

const totalReservationsData = [16, 30, 20, 22, 25, 27, 30, 32, 34, 10, 20, 30];
const totalUsers = 300;
const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getDynamicMonths = () => {
  const currentMonthIndex = new Date().getMonth();
  const dynamicMonths = [...allMonths.slice(currentMonthIndex + 1), ...allMonths.slice(0, currentMonthIndex + 1)];
  return dynamicMonths;
};

const Dashboard = () => {
  // Initialisation de selectedAdmin avec le premier admin de la liste
  const [selectedAdmin, setSelectedAdmin] = useState(adminData[0]);
  const [superAdminRevenue, setSuperAdminRevenue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRevenue = async () => {
      const revenue = 300000;
      setSuperAdminRevenue(revenue);
    };

    fetchRevenue();
  }, []);

  const selectAdmin = (admin) => {
    setSelectedAdmin(admin);
  };

  const filteredAdminData = adminData.filter((admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartData = selectedAdmin ? {
    labels: getDynamicMonths(),
    datasets: [
      {
        label: `Réservations par mois pour ${selectedAdmin.name}`,
        data: selectedAdmin.monthlyReservations,
        fill: true,
        backgroundColor: 'rgba(34,193,195,0.2)',
        borderColor: 'rgba(34,193,195,1)',
        pointBackgroundColor: 'rgba(255, 255, 255, 1)', 
        pointBorderColor: 'rgba(34,193,195,1)',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5, 
        pointHoverRadius: 7,
      },
    ],
  } : null;

  const totalReservationsChartData = {
    labels: getDynamicMonths(),
    datasets: [
      {
        label: 'Total des Réservations',
        data: totalReservationsData,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const totalAdmins = adminData.length;

  const totalReservationsByAdmin = selectedAdmin
    ? selectedAdmin.monthlyReservations.reduce((total, num) => total + num, 0)
    : 0;

  return (
    <div className="min-h-screen p-8 -mt-20">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Total des Réservations</h2>
          <div className="h-72">
            <Bar data={totalReservationsChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-[#0A5DA6] shadow-lg rounded-xl p-6 flex items-center hover:shadow-2xl transition-shadow duration-300">
            <FaUserShield className="text-[#0A5DA6] text-4xl mr-4" />
            <div>
              <h2 className="text-xl font-bold mb-4 text-[#0A5DA6]">Administrateurs</h2>
              <p className="text-2xl text-center font-semibold text-gray-800">{totalAdmins}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-600 shadow-lg rounded-xl p-6 flex items-center hover:shadow-2xl transition-shadow duration-300">
            <FaUsers className="text-purple-600 text-4xl mr-4" />
            <div>
              <h2 className="text-xl font-bold mb-4 text-purple-600">Utilisateurs</h2>
              <p className="text-2xl text-center font-semibold text-gray-800">{totalUsers}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-600 shadow-lg rounded-xl p-6 flex items-center hover:shadow-2xl transition-shadow duration-300">
            <FaMoneyBillWave className="text-green-600 text-4xl mr-4" />
            <div>
              <h2 className="text-xl font-bold mb-2 text-green-600 text-center">Revenue</h2>
              <p className="text-2xl text-center font-semibold text-gray-800">{superAdminRevenue.toLocaleString()} Ar</p>
            </div>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-300 shadow-md rounded-lg overflow-x-auto">
          <div className="p-6">
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table className="min-w-full">
            <thead className="bg-gray-200 text-center border-b border-gray-200">
              <tr>
                <th className="py-3 px-6 text-gray-600 font-medium">Nom</th>
                <th className="py-3 px-6 text-gray-600 font-medium">Email</th>
                <th className="py-3 px-6 text-gray-600 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdminData.map((admin) => (
                <tr
                  key={admin.id}
                  className="hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => selectAdmin(admin)}
                >
                  <td className="py-3 px-6 border-b">{admin.name}</td>
                  <td className="py-3 px-6 border-b">{admin.email}</td>
                  <td className="py-3 px-6 border-b">
                    <button className="text-[#0A5DA6] hover:text-[] transition-colors font-semibold">
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedAdmin && (
          <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6">
            <p className="mb-6 text-gray-600">Email: {selectedAdmin.email}</p>
            <p className="mb-6 text-gray-600">Total Réservations: {totalReservationsByAdmin}</p>

            <div className="h-80">
              <Line data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
