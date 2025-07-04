import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Unauthorized } from '@/pages/shared/Unauthorized'
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

  console.log('🛡️ RoleGuard check:', {
    userRole: user?.role,
    allowedRoles,
    hasPermission: hasRole(allowedRoles)
  })

  const hasPermission = hasRole(allowedRoles)

  if (!hasPermission) {
    console.log('🚫 RoleGuard: Access denied for user', user?.role, 'to', allowedRoles)
    
    // Use custom fallback or default Unauthorized page
    return fallback || <Unauthorized />
  }

  console.log('✅ RoleGuard: Access granted for user', user?.role)
  return <>{children}</>
}