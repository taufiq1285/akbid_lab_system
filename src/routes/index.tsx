import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from '../pages/auth/Login'
import { Dashboard } from '../pages/Dashboard'
import { AdminDashboard } from '../pages/admin/AdminDashboard'
import { DosenDashboard } from '../pages/dosen/DosenDashboard'
import { LaboranDashboard } from '../pages/laboran/LaboranDashboard'
import { MahasiswaDashboard } from '../pages/mahasiswa/MahasiswaDashboard'
import { AuthGuard } from '../components/guards/AuthGuard'
import { RoleGuard } from '../components/guards/RoleGuard'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  )
}

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  return <>{children}</>
}

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* Protected Routes - Basic Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Role-Based Protected Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['admin', 'dev_super']}>
                <AdminDashboard />
              </RoleGuard>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/dosen" 
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['dosen', 'admin', 'dev_super']}>
                <DosenDashboard />
              </RoleGuard>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/laboran" 
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['laboran', 'admin', 'dev_super']}>
                <LaboranDashboard />
              </RoleGuard>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/mahasiswa" 
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['mahasiswa', 'admin', 'dev_super']}>
                <MahasiswaDashboard />
              </RoleGuard>
            </ProtectedRoute>
          } 
        />
        
        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}