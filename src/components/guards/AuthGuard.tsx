import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

interface AuthGuardProps {
  children: React.ReactNode
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth()
  const location = useLocation()

  console.log('🛡️ AuthGuard check:', { 
    isAuthenticated, 
    loading, 
    userExists: !!user,
    userName: user?.name,
    currentPath: location.pathname
  })

  // Force re-evaluation when auth state changes
  useEffect(() => {
    console.log('🛡️ AuthGuard: Auth state changed, re-evaluating...')
    if (!loading && !isAuthenticated) {
      console.log('🛡️ AuthGuard: User not authenticated, should redirect to login')
    }
  }, [isAuthenticated, loading])

  // Show loading while checking authentication
  if (loading) {
    console.log('🛡️ AuthGuard: Still loading authentication...')
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Checking authentication...</p>
          <p className="text-xs text-gray-400 mt-1">Phase 1: Basic routing active</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('🛡️ AuthGuard: Not authenticated, redirecting to /login')
    return <Navigate to="/login" replace />
  }

  console.log('🛡️ AuthGuard: Authenticated! User:', user?.name, '- Showing dashboard')
  return <>{children}</>
}