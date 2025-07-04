import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui'

interface NavigationItem {
  label: string
  path: string
  icon: string
  roles: string[]
  description?: string
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard Umum',
    path: '/dashboard',
    icon: '📊',
    roles: ['admin', 'dosen', 'laboran', 'mahasiswa', 'dev_super'],
    description: 'Overview sistem'
  },
  {
    label: 'Admin Dashboard',
    path: '/admin',
    icon: '👑',
    roles: ['admin', 'dev_super'],
    description: 'Panel administrasi sistem'
  },
  {
    label: 'Dosen Dashboard',
    path: '/dosen',
    icon: '👨‍🏫',
    roles: ['dosen', 'admin', 'dev_super'],
    description: 'Panel pengajar'
  },
  {
    label: 'Laboran Dashboard',
    path: '/laboran',
    icon: '🔬',
    roles: ['laboran', 'admin', 'dev_super'],
    description: 'Panel laboratorium'
  },
  {
    label: 'Mahasiswa Dashboard',
    path: '/mahasiswa',
    icon: '👩‍🎓',
    roles: ['mahasiswa', 'admin', 'dev_super'],
    description: 'Portal mahasiswa'
  }
]

export const Navigation: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, hasRole } = useAuth()

  // Filter navigation items based on user role
  const allowedItems = navigationItems.filter(item => 
    hasRole(item.roles)
  )

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 py-3 overflow-x-auto">
          {allowedItems.map((item) => {
            const isActive = location.pathname === item.path
            
            return (
              <Button
                key={item.path}
                variant={isActive ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center space-x-2 whitespace-nowrap ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title={item.description}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </div>
      
      {/* Role Access Indicator */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-600">
            <span className="font-medium">Access Level:</span> {user?.role?.toUpperCase()} • 
            <span className="ml-1">
              {allowedItems.length} dashboard{allowedItems.length !== 1 ? 's' : ''} available
            </span>
          </p>
        </div>
      </div>
    </nav>
  )
}

// Default export juga untuk compatibility
export default Navigation