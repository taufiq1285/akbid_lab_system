import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button, Badge } from '@/components/ui'

export const RoleSwitcher: React.FC = () => {
  const { user, devQuickLogin, logout, isDev, testAccounts } = useAuth()
  
  if (!isDev) return null

  const handleRoleSwitch = async (role: string) => {
    await devQuickLogin(role)
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">🔧</span>
          <h3 className="font-medium text-yellow-800">Development Tools</h3>
          <Badge variant="warning" size="sm">DEV MODE</Badge>
        </div>
        <Badge variant="primary">{user?.role?.toUpperCase()}</Badge>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-yellow-700 mb-2">Quick Role Switch:</p>
          <div className="flex flex-wrap gap-2">
            {testAccounts.map((account) => (
              <Button
                key={account.role}
                variant={user?.role === account.role ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handleRoleSwitch(account.role)}
                className="text-xs"
              >
                {account.role === 'dev_super' ? 'DEV' : account.role.toUpperCase()}
              </Button>
            ))}
            <Button
              variant="danger"
              size="sm"
              onClick={logout}
              className="text-xs"
            >
              LOGOUT
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-yellow-600">
          <p><strong>Current:</strong> {user?.name} ({user?.email})</p>
          <p><strong>Session:</strong> Persistent until logout</p>
        </div>
      </div>
    </div>
  )
}