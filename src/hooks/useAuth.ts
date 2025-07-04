import { useState, useEffect } from 'react'
import type { User, AuthState, LoginCredentials, TestAccount, UserRole } from '../types/auth'

// Simple session storage for development
const SESSION_KEY = 'akbid_auth_session'

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true, // Start with loading true
    error: null,
    isAuthenticated: false
  })

  // Load session on initialization - IMMEDIATELY and SYNCHRONOUSLY
  useEffect(() => {
    console.log('🔐 Auth initialization started')
    
    const initializeAuth = () => {
      try {
        // Check for existing session SYNCHRONOUSLY
        const savedSession = sessionStorage.getItem(SESSION_KEY)
        console.log('📱 Raw session data:', savedSession)
        
        if (savedSession) {
          const userData = JSON.parse(savedSession)
          console.log('📱 Parsed session data:', userData)
          
          // Validate session data
          if (userData && userData.id && userData.name && userData.role) {
            console.log('✅ Valid session found:', userData.name, userData.role)
            
            setAuthState({
              user: userData,
              loading: false,
              error: null,
              isAuthenticated: true
            })
            
            console.log('✅ Session restored successfully')
            return
          } else {
            console.log('❌ Invalid session data, clearing...')
            sessionStorage.removeItem(SESSION_KEY)
          }
        } else {
          console.log('📱 No existing session found')
        }
        
        // No valid session found
        setAuthState({
          user: null,
          loading: false,
          error: null,
          isAuthenticated: false
        })
        
      } catch (error) {
        console.error('📱 Session load error:', error)
        sessionStorage.removeItem(SESSION_KEY) // Clear corrupted session
        setAuthState({
          user: null,
          loading: false,
          error: null,
          isAuthenticated: false
        })
      }
    }

    // Initialize immediately - no delay
    initializeAuth()
    
  }, []) // Empty dependency array - only run once!

  // Mock login function
  const login = async (credentials: LoginCredentials) => {
    console.log('🔑 Login attempt started:', credentials)
    setAuthState(prev => ({ ...prev, loading: true }))
    
    try {
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const mockUser: User = {
        id: '1',
        name: 'Administrator',
        email: credentials.email,
        role: 'admin',
        nim_nip: 'ADM001',
        is_active: true,
        email_verified: true,
        last_login: new Date().toISOString(),
        phone: null,
        address: null,
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      // Save to session IMMEDIATELY
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(mockUser))
      console.log('💾 Session saved for user:', mockUser.name)
      console.log('💾 Session verification:', sessionStorage.getItem(SESSION_KEY))
      
      setAuthState({
        user: mockUser,
        loading: false,
        error: null,
        isAuthenticated: true
      })
      
      console.log('✅ Login completed successfully')
      return { user: mockUser, error: null }
    } catch (error) {
      console.error('❌ Login failed:', error)
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Login failed' 
      }))
      return { user: null, error: 'Login failed' }
    }
  }

  // Mock quick login
  const devQuickLogin = async (role: string) => {
    console.log('🚀 Quick login attempt:', role)
    setAuthState(prev => ({ ...prev, loading: true }))
    
    try {
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const mockUser: User = {
        id: role === 'admin' ? '1' : '2',
        name: role === 'admin' ? 'Administrator' : 
              role === 'dosen' ? 'Dr. Siti Nurhaliza' :
              role === 'laboran' ? 'Ahmad Laboratorium' :
              role === 'mahasiswa' ? 'Siti Mahasiswa' :
              'Developer Super Admin',
        email: `${role}@akbid.com`,
        role: role as UserRole,
        nim_nip: role === 'admin' ? 'ADM001' :
                 role === 'dosen' ? 'DSN001' :
                 role === 'laboran' ? 'LAB001' :
                 role === 'mahasiswa' ? '2024001' :
                 'DEV001',
        is_active: true,
        email_verified: true,
        last_login: new Date().toISOString(),
        phone: null,
        address: null,
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      // Save to session IMMEDIATELY
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(mockUser))
      console.log('💾 Session saved for user:', mockUser.name, '(', mockUser.role, ')')
      console.log('💾 Session verification:', sessionStorage.getItem(SESSION_KEY))
      
      setAuthState({
        user: mockUser,
        loading: false,
        error: null,
        isAuthenticated: true
      })
      
      console.log('✅ Quick login completed successfully')
      return { user: mockUser, error: null }
    } catch (error) {
      console.error('❌ Quick login failed:', error)
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Quick login failed' 
      }))
      return { user: null, error: 'Quick login failed' }
    }
  }

  const logout = async () => {
    console.log('🚪 Logout started')
    
    try {
      // Clear session IMMEDIATELY
      sessionStorage.removeItem(SESSION_KEY)
      console.log('💾 Session cleared')
      console.log('💾 Session verification after clear:', sessionStorage.getItem(SESSION_KEY))
      
      setAuthState({
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false
      })
      
      console.log('✅ Logout completed')
      
      // Auto-redirect to login using window.location for reliable navigation
      // This ensures the user is always redirected regardless of routing context
      window.location.href = '/login'
      
      return { error: null }
    } catch (error) {
      console.error('❌ Logout error:', error)
      return { error: 'Logout failed' }
    }
  }

  // Helper functions
  const hasRole = (role: string | string[]) => {
    if (!authState.user) {
      return false
    }
    
    if (Array.isArray(role)) {
      return role.includes(authState.user.role)
    }
    
    return authState.user.role === role
  }

  const isAdmin = () => hasRole(['admin', 'dev_super'])
  const isDosen = () => hasRole('dosen') || hasRole(['admin', 'dev_super'])
  const isLaboran = () => hasRole('laboran') || hasRole(['admin', 'dev_super'])
  const isMahasiswa = () => hasRole('mahasiswa') || hasRole(['admin', 'dev_super'])
  const isDevSuper = () => hasRole('dev_super')

  const testAccounts: TestAccount[] = [
    { email: 'admin@akbid.com', password: 'admin123', role: 'admin', name: 'Administrator', nim_nip: 'ADM001' },
    { email: 'dosen@akbid.com', password: 'dosen123', role: 'dosen', name: 'Dr. Siti Nurhaliza', nim_nip: 'DSN001' },
    { email: 'laboran@akbid.com', password: 'laboran123', role: 'laboran', name: 'Ahmad Laboratorium', nim_nip: 'LAB001' },
    { email: 'mahasiswa@akbid.com', password: 'mahasiswa123', role: 'mahasiswa', name: 'Siti Mahasiswa', nim_nip: '2024001' },
    { email: 'dev@akbid.com', password: 'dev123', role: 'dev_super', name: 'Developer Super Admin', nim_nip: 'DEV001' }
  ]

  // Debug logging
  useEffect(() => {
    console.log('📊 Auth state changed:', {
      isAuthenticated: authState.isAuthenticated,
      loading: authState.loading,
      userRole: authState.user?.role,
      userName: authState.user?.name,
      error: authState.error
    })
  }, [authState])

  return {
    // State
    ...authState,
    
    // Actions
    login,
    logout,
    devQuickLogin,
    
    // Helper functions
    hasRole,
    isAdmin,
    isDosen,
    isLaboran,
    isMahasiswa,
    isDevSuper,
    
    // Development helpers
    testAccounts,
    isDev: true
  }
}