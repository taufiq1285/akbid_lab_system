import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button, Badge } from '@/components/ui'

interface SidebarItem {
  label: string
  path: string
  icon: string
  roles: string[]
  description?: string
  children?: SidebarItem[]
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: '📊',
    roles: ['admin', 'dosen', 'laboran', 'mahasiswa', 'dev_super'],
    description: 'Overview sistem'
  },
  {
    label: 'Admin Panel',
    path: '/admin',
    icon: '👑',
    roles: ['admin', 'dev_super'],
    description: 'Panel administrasi',
    children: [
      {
        label: 'User Management',
        path: '/admin/users',
        icon: '👥',
        roles: ['admin', 'dev_super']
      },
      {
        label: 'Lab Management',
        path: '/admin/labs',
        icon: '🏥',
        roles: ['admin', 'dev_super']
      },
      {
        label: 'System Reports',
        path: '/admin/reports',
        icon: '📊',
        roles: ['admin', 'dev_super']
      }
    ]
  },
  {
    label: 'Dosen Panel',
    path: '/dosen',
    icon: '👨‍🏫',
    roles: ['dosen', 'admin', 'dev_super'],
    description: 'Panel pengajar',
    children: [
      {
        label: 'Mata Kuliah',
        path: '/dosen/mata-kuliah',
        icon: '📚',
        roles: ['dosen', 'admin', 'dev_super']
      },
      {
        label: 'Jadwal Praktikum',
        path: '/dosen/jadwal',
        icon: '📅',
        roles: ['dosen', 'admin', 'dev_super']
      },
      {
        label: 'Presensi',
        path: '/dosen/presensi',
        icon: '✅',
        roles: ['dosen', 'admin', 'dev_super']
      }
    ]
  },
  {
    label: 'Laboran Panel',
    path: '/laboran',
    icon: '🔬',
    roles: ['laboran', 'admin', 'dev_super'],
    description: 'Panel laboratorium',
    children: [
      {
        label: 'Inventaris Alat',
        path: '/laboran/inventaris',
        icon: '📦',
        roles: ['laboran', 'admin', 'dev_super']
      },
      {
        label: 'Peminjaman',
        path: '/laboran/peminjaman',
        icon: '📋',
        roles: ['laboran', 'admin', 'dev_super']
      },
      {
        label: 'Maintenance',
        path: '/laboran/maintenance',
        icon: '🔧',
        roles: ['laboran', 'admin', 'dev_super']
      }
    ]
  },
  {
    label: 'Mahasiswa Panel',
    path: '/mahasiswa',
    icon: '👩‍🎓',
    roles: ['mahasiswa', 'admin', 'dev_super'],
    description: 'Portal mahasiswa',
    children: [
      {
        label: 'Jadwal Saya',
        path: '/mahasiswa/jadwal',
        icon: '📅',
        roles: ['mahasiswa', 'admin', 'dev_super']
      },
      {
        label: 'Materi',
        path: '/mahasiswa/materi',
        icon: '📖',
        roles: ['mahasiswa', 'admin', 'dev_super']
      },
      {
        label: 'Upload Laporan',
        path: '/mahasiswa/laporan',
        icon: '📤',
        roles: ['mahasiswa', 'admin', 'dev_super']
      }
    ]
  }
]

interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, hasRole } = useAuth()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Filter sidebar items based on user role
  const allowedItems = sidebarItems.filter(item => 
    hasRole(item.roles)
  )

  const handleNavigate = (path: string) => {
    navigate(path)
    if (onClose) onClose() // Close mobile sidebar
  }

  const toggleExpanded = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    )
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const isExpanded = (path: string) => {
    return expandedItems.includes(path) || isActive(path)
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏥</span>
            <h2 className="text-lg font-bold text-gray-900">Akbid System</h2>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {user?.name?.charAt(0)?.toUpperCase() || '?'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'Unknown User'}
              </p>
              <Badge 
                variant={
                  user?.role === 'admin' ? 'primary' :
                  user?.role === 'dosen' ? 'success' :
                  user?.role === 'laboran' ? 'warning' :
                  user?.role === 'mahasiswa' ? 'secondary' :
                  'danger'
                }
                size="sm"
              >
                {user?.role?.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {allowedItems.map((item) => (
            <div key={item.path}>
              {/* Main Item */}
              <div className="flex items-center">
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={`flex-1 flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title={item.description}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>

                {/* Expand/Collapse Button */}
                {item.children && item.children.length > 0 && (
                  <button
                    onClick={() => toggleExpanded(item.path)}
                    className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <svg 
                      className={`w-4 h-4 transform transition-transform ${
                        isExpanded(item.path) ? 'rotate-90' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Sub Items */}
              {item.children && isExpanded(item.path) && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.children
                    .filter(child => hasRole(child.roles))
                    .map((child) => (
                      <button
                        key={child.path}
                        onClick={() => handleNavigate(child.path)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive(child.path)
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{child.icon}</span>
                        <span className="truncate">{child.label}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Sistem Informasi Praktikum<br />
            Akademi Kebidanan Mega Buana
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar