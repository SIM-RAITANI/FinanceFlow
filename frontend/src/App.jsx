import { useState } from 'react'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import useAuthStore from './store/useAuthStore'
import { BrowserRouter as Router ,Routes ,Route , Navigate} from 'react-router-dom'

import './App.css'

import LandingPage from './pages/LandingPage.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Register from './pages/Register.jsx'
import Users from './pages/Users.jsx'
import DashboardWrapper from './pages/DashboardWrapper.jsx'
import PublicRoute from './components/PublicRoute.jsx'
import NotFound from './pages/NotFound.jsx'
import ActivityLog from './pages/ActivityLog.jsx'

const ProtectedRoute = ({ children }) => {
  const {token} = useAuthStore()
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
     
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>

        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardWrapper />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/transactions" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <Transactions />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <Users />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/logs" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <ActivityLog />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App
