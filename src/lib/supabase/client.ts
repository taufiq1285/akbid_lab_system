import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: { 'x-my-custom-header': 'akbid-lab-system' },
  },
})

// Helper untuk development
export const isDev = import.meta.env.VITE_APP_ENV === 'development'
export const enableDevMode = import.meta.env.VITE_ENABLE_DEV_MODE === 'true'
export const enableRoleSwitching = import.meta.env.VITE_ENABLE_ROLE_SWITCHING === 'true'

// Export types untuk TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'admin' | 'dosen' | 'laboran' | 'mahasiswa' | 'dev_super'
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
        Insert: {
          id?: string
          email: string
          name: string
          role?: 'admin' | 'dosen' | 'laboran' | 'mahasiswa' | 'dev_super'
          nim_nip?: string | null
          phone?: string | null
          address?: string | null
          avatar_url?: string | null
          is_active?: boolean
          last_login?: string | null
          email_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'admin' | 'dosen' | 'laboran' | 'mahasiswa' | 'dev_super'
          nim_nip?: string | null
          phone?: string | null
          address?: string | null
          avatar_url?: string | null
          is_active?: boolean
          last_login?: string | null
          email_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      lab_rooms: {
        Row: {
          id: string
          code: string
          name: string
          description: string | null
          capacity: number
          location: string | null
          facilities: string[] | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      mata_kuliah: {
        Row: {
          id: string
          kode_matkul: string
          nama_matkul: string
          deskripsi: string | null
          semester: number
          sks: number
          dosen_id: string | null
          lab_room_id: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
    }
  }
}