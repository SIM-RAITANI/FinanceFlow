import React from 'react';
import useAuthStore from '../store/useAuthStore';
import Dashboard from './Dashboard'; // Your existing Personal Dashboard
import AdminDashboard from './AdminDashboard'; // The new Global Dashboard

const DashboardWrapper = () => {
  const { user } = useAuthStore();

  
  if (user?.role === 'admin' || user?.role === 'analyst') {
    return <AdminDashboard />;
  }

 
  return <Dashboard />;
};

export default DashboardWrapper;