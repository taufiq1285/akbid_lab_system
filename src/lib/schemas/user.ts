import { z } from 'zod'

// User Role Schema
export const userRoleSchema = z.enum(['admin', 'dosen', 'laboran', 'mahasiswa', 'dev_super'])

// Base User Schema
export const userSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email('Email tidak valid'),
  name: z.string().min(2, 'Nama minimal 2 karakter').max(100, 'Nama maksimal 100 karakter'),
  role: userRoleSchema,
  nim_nip: z.string().min(3, 'NIM/NIP minimal 3 karakter').max(20, 'NIM/NIP maksimal 20 karakter'),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
  is_active: z.boolean().default(true),
  email_verified: z.boolean().default(false),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  last_login: z.string().optional().nullable()
})

// Create User Schema (untuk form create)
export const createUserSchema = userSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  last_login: true
}).extend({
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string().min(6, 'Konfirmasi password minimal 6 karakter')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password dan konfirmasi password tidak sama',
  path: ['confirmPassword']
})

// Update User Schema (untuk form edit)
export const updateUserSchema = userSchema.omit({
  created_at: true,
  updated_at: true,
  last_login: true
}).extend({
  password: z.string().min(6, 'Password minimal 6 karakter').optional(),
  confirmPassword: z.string().optional()
}).refine((data) => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword
  }
  return true
}, {
  message: 'Password dan konfirmasi password tidak sama',
  path: ['confirmPassword']
})

// User Filter Schema (untuk search dan filter)
export const userFilterSchema = z.object({
  search: z.string().optional(),
  role: userRoleSchema.optional(),
  is_active: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.enum(['name', 'email', 'role', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

// Types from schemas
export type User = z.infer<typeof userSchema>
export type CreateUserData = z.infer<typeof createUserSchema>
export type UpdateUserData = z.infer<typeof updateUserSchema>
export type UserFilter = z.infer<typeof userFilterSchema>
export type UserRole = z.infer<typeof userRoleSchema>

// Validation helpers
export const validateUser = (data: unknown) => {
  return userSchema.safeParse(data)
}

export const validateCreateUser = (data: unknown) => {
  return createUserSchema.safeParse(data)
}

export const validateUpdateUser = (data: unknown) => {
  return updateUserSchema.safeParse(data)
}

export const validateUserFilter = (data: unknown) => {
  return userFilterSchema.safeParse(data)
}

// Role validation helpers
export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames = {
    admin: 'Administrator',
    dosen: 'Dosen/Pengajar',
    laboran: 'Laboran',
    mahasiswa: 'Mahasiswa',
    dev_super: 'Developer Super Admin'
  }
  return roleNames[role]
}

export const getRoleColor = (role: UserRole): string => {
  const roleColors = {
    admin: 'primary',
    dosen: 'success',
    laboran: 'warning',
    mahasiswa: 'secondary',
    dev_super: 'danger'
  }
  return roleColors[role]
}

// Form validation error formatter
export const formatValidationErrors = (error: z.ZodError) => {
  const errors: Record<string, string> = {}
  
  error.errors.forEach((err) => {
    const path = err.path.join('.')
    errors[path] = err.message
  })
  
  return errors
}