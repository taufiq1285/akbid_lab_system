import { supabase } from './client'
import type { Database } from './client'

type User = Database['public']['Tables']['users']['Row']
type LabRoom = Database['public']['Tables']['lab_rooms']['Row']
type MataKuliah = Database['public']['Tables']['mata_kuliah']['Row']

export class DatabaseService {
  // Users
  static async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }

  static async createUser(userData: Database['public']['Tables']['users']['Insert']) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Lab Rooms
  static async getLabRooms() {
    const { data, error } = await supabase
      .from('lab_rooms')
      .select('*')
      .eq('is_active', true)
      .order('code')
    
    if (error) throw error
    return data
  }

  // Mata Kuliah
  static async getMataKuliah() {
    const { data, error } = await supabase
      .from('mata_kuliah')
      .select(`
        *,
        dosen:users(name, email),
        lab_room:lab_rooms(name, code)
      `)
      .eq('is_active', true)
      .order('semester', { ascending: true })
    
    if (error) throw error
    return data
  }

  // Test connection
  static async testConnection() {
    try {
      const { data, error } = await supabase
        .from('lab_rooms')
        .select('count')
        .limit(1)
      
      if (error) throw error
      return { success: true, message: 'Database connection successful' }
    } catch (error) {
      return { success: false, message: `Database connection failed: ${error}` }
    }
  }
}