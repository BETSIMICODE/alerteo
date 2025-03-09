
import React, { useState } from 'react';
import Select from 'react-select';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CSS/Super.css';
import AdminList from './AdminList';
import UploadImage from '@/components/UploadImage';

function AdminManagement() {
    const [activeTab, setActiveTab] = useState('admin');
    const [adminData, setAdminData] = useState({
        companyName: '',
        email: '',
        password: '',
    });
    const [contractDeadline, setContractDeadline] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const isAdminFormComplete = () =>
        adminData.companyName && adminData.email && adminData.password;

    const handleAdminChange = (e) => {
        setAdminData({
            ...adminData,
            [e.target.id]: e.target.value,
        });
    };

    const handleContractChange = (e) => {
        setContractDeadline(e.target.value);
    };

    const handleSubmitAdmin = (e) => {
        e.preventDefault();
        if (isAdminFormComplete()) {
            setActiveTab('contractDeadline');
        } else {
            toast.error('Veuillez compléter tous les champs du formulaire Admin.');
        }
    };

    const handleSubmitContract = (e) => {
        e.preventDefault();
        if (!contractDeadline) {
            toast.error('Veuillez sélectionner une date de fin de contrat.');
            return;
        }
        setShowSuccessModal(true);
    };

    const closeModal = () => {
        setShowSuccessModal(false);
        window.location.reload();
    };

    const admins = [
        { id: 1, name: 'Admin', email: 'adminService2202@gmail.com', contractEndDate: '2024-09-30' },
        { id: 2, name: 'Admin 2', email: 'admin2@gmail.com', contractEndDate: '2024-10-15' },
        { id: 3, name: 'Admin 2', email: 'admin3@gmail.com', contractEndDate: '2024-11-15' },

    ];

    return (
        <div className="flex p-8  relative bg-gray-100">
            <div className="w-3/4 pr-8">
            <UploadImage/>
            </div>
            <ToastContainer />
        </div>
    );
}


export default AdminManagement;