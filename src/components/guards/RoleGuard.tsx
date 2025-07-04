import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import type { UserRole } from '@/types/auth'

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole | UserRole[]
  fallback?: React.ReactNode
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles,
  fallback 
}) => {
  const { hasRole, user } = useAuth()

  const hasPermission = hasRole(allowedRoles)

  if (!hasPermission) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ⛔ Akses Ditolak
          </h2>
          <p className="text-gray-600 mb-4">
            Anda tidak memiliki akses ke halaman ini.
          </p>
          <p className="text-sm text-gray-500">
            Role Anda: <span className="font-medium">{user?.role}</span>
          </p>
          <p className="text-sm text-gray-500">
            Role yang dibutuhkan: <span className="font-medium">
              {Array.isArray(allowedRoles) ? allowedRoles.join(', ') : allowedRoles}
            </span>
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}