export type UserRole = 'admin' | 'dosen' | 'laboran' | 'mahasiswa' | 'dev_super'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  nim_nip: string | null
  phone: string | null
  address: string | null
  avatar_url: string | null
  is_active: boolean
  last_login: string | null
  email_verified: boolean
  created_at: string
  updated_at: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpData {
  email: string
  password: string
  name: string
  role: UserRole
  nim_nip?: string
}

// Development features
export interface DevAuthState {
  isDev: boolean
  enableRoleSwitching: boolean
  currentDevRole: UserRole | null
  testAccounts: TestAccount[]
}

export interface TestAccount {
  email: string
  password: string
  role: UserRole
  name: string
  nim_nip: string
}