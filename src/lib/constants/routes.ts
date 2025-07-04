export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  
  // Will expand in Week 3
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    LABS: '/admin/labs',
  },
  
  DOSEN: {
    DASHBOARD: '/dosen/dashboard',
    MATA_KULIAH: '/dosen/mata-kuliah',
  },
  
  // ... more routes
} as const