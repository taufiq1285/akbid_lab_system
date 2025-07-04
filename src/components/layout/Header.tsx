import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button, Badge, Card, CardBody } from '@/components/ui'

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout, devQuickLogin, isDev, testAccounts } = useAuth()
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false)

  const handleLogout = async () => {
    console.log('🚪 Header logout initiated')
    const { error } = await logout()
    if (!error) {
      console.log('✅ Logout successful, navigating to /login')
      navigate('/login')
    }
  }

  const handleRoleSwitch = async (role: string) => {
    console.log('🔄 Switching to role:', role)
    const { error } = await devQuickLogin(role)
    if (!error) {
      console.log('✅ Role switch successful')
      setShowRoleSwitcher(false)
      // Navigate to appropriate dashboard
      if (role === 'admin') navigate('/admin')
      else if (role === 'dosen') navigate('/dosen')
      else if (role === 'laboran') navigate('/laboran')
      else if (role === 'mahasiswa') navigate('/mahasiswa')
      else navigate('/dashboard')
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-2xl">🏥</span>
              <h1 className="ml-2 text-xl font-bold text-gray-900">
                Sistem Akbid
              </h1>
            </div>
            
            {/* Dev Mode Indicator */}
            {isDev && (
              <Badge variant="warning" size="sm">
                🔧 DEV MODE
              </Badge>
            )}
          </div>

          {/* User Info & Controls */}
          <div className="flex items-center space-x-4">
            {/* Current User Info */}
            {user && (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={
                        user.role === 'admin' ? 'primary' :
                        user.role === 'dosen' ? 'success' :
                        user.role === 'laboran' ? 'warning' :
                        user.role === 'mahasiswa' ? 'secondary' :
                        'danger'
                      }
                      size="sm"
                    >
                      {user.role.toUpperCase()}
                    </Badge>
                    
                    {/* Dev Role Switcher Button */}
                    {isDev && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                        className="text-xs px-2 py-1"
                      >
                        🔄 Switch
                      </Button>
                    )}
                  </div>
                </div>

                {/* Logout Button */}
                <Button 
                  variant="secondary" 
                  onClick={handleLogout}
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Dev Role Switcher Dropdown */}
        {isDev && showRoleSwitcher && (
          <div className="absolute right-4 top-16 z-50">
            <Card className="w-64 shadow-lg">
              <CardBody>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">🔧 Role Switcher</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowRoleSwitcher(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-600">
                    Development mode - Switch between roles for testing
                  </p>
                  
                  <div className="space-y-2">
                    {testAccounts.map((account) => (
                      <button
                        key={account.role}
                        onClick={() => handleRoleSwitch(account.role)}
                        className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                          user?.role === account.role
                            ? 'bg-blue-100 text-blue-900 border border-blue-200'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">
                              {account.role === 'dev_super' ? '👨‍💻 Dev Super' :
                               account.role === 'admin' ? '👑 Admin' :
                               account.role === 'dosen' ? '👨‍🏫 Dosen' :
                               account.role === 'laboran' ? '🔬 Laboran' :
                               '👩‍🎓 Mahasiswa'}
                            </div>
                            <div className="text-xs text-gray-500">{account.name}</div>
                          </div>
                          {user?.role === account.role && (
                            <span className="text-blue-600">✓</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="border-t pt-2">
                    <p className="text-xs text-gray-500">
                      Current: {user?.name} ({user?.role})
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </header>
  )
}