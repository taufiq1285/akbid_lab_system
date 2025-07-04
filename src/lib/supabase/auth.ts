import { supabase } from './client'
import type { User, LoginCredentials, SignUpData, TestAccount } from '@/types/auth'

export class AuthService {
  // Sign in with email/password
  static async signIn(credentials: LoginCredentials) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (authError) throw authError

      if (authData.user) {
        // Get user profile from users table
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authData.user.id)
          .single()

        if (profileError) {
          console.warn('Profile not found, user might need to complete profile')
          return { user: null, error: 'Profile not found' }
        }

        // Update last login
        await supabase
          .from('users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', authData.user.id)

        return { user: userProfile as User, error: null }
      }

      return { user: null, error: 'Authentication failed' }
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Sign up new user
  static async signUp(signUpData: SignUpData) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
      })

      if (authError) throw authError

      if (authData.user) {
        // Create user profile
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: signUpData.email,
            name: signUpData.name,
            role: signUpData.role,
            nim_nip: signUpData.nim_nip,
            email_verified: false,
            is_active: true
          })
          .select()
          .single()

        if (profileError) throw profileError

        return { user: userProfile as User, error: null }
      }

      return { user: null, error: 'User creation failed' }
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Sign out
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Get current user
  static async getCurrentUser() {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (authUser) {
        const { data: userProfile } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single()
        
        return userProfile as User | null
      }
      
      return null
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  // Get auth session
  static async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session
    } catch (error) {
      console.error('Error getting session:', error)
      return null
    }
  }

  // Listen to auth changes
  static onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.getCurrentUser()
        callback(user)
      } else {
        callback(null)
      }
    })
  }

  // Development: Get test accounts
  static getTestAccounts(): TestAccount[] {
    return [
      {
        email: 'admin@akbid.com',
        password: 'admin123',
        role: 'admin',
        name: 'Administrator',
        nim_nip: 'ADM001'
      },
      {
        email: 'dosen@akbid.com', 
        password: 'dosen123',
        role: 'dosen',
        name: 'Dr. Siti Nurhaliza',
        nim_nip: 'DSN001'
      },
      {
        email: 'laboran@akbid.com',
        password: 'laboran123', 
        role: 'laboran',
        name: 'Ahmad Laboratorium',
        nim_nip: 'LAB001'
      },
      {
        email: 'mahasiswa@akbid.com',
        password: 'mahasiswa123',
        role: 'mahasiswa', 
        name: 'Siti Mahasiswa',
        nim_nip: '2024001'
      },
      {
        email: 'dev@akbid.com',
        password: 'dev123',
        role: 'dev_super',
        name: 'Developer Super Admin',
        nim_nip: 'DEV001'
      }
    ]
  }

  // Development: Quick login with test account
  static async quickDevLogin(role: string) {
    const testAccounts = this.getTestAccounts()
    const account = testAccounts.find(acc => acc.role === role)
    
    if (!account) {
      return { user: null, error: `Test account for role ${role} not found` }
    }

    return this.signIn({
      email: account.email,
      password: account.password
    })
  }
}