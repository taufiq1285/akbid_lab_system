import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardHeader, CardBody, Badge } from '@/components/ui'

export const PermissionDebug: React.FC = () => {
  const { user, isAdmin, isDosen, isLaboran, isMahasiswa, isDevSuper, hasRole } = useAuth()
  
  const permissions = [
    { name: 'isAdmin()', result: isAdmin(), roles: ['admin', 'dev_super'] },
    { name: 'isDosen()', result: isDosen(), roles: ['dosen', 'admin', 'dev_super'] },
    { name: 'isLaboran()', result: isLaboran(), roles: ['laboran', 'admin', 'dev_super'] },
    { name: 'isMahasiswa()', result: isMahasiswa(), roles: ['mahasiswa', 'admin', 'dev_super'] },
    { name: 'isDevSuper()', result: isDevSuper(), roles: ['dev_super'] },
  ]

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          🔍 Permission Debug Panel
        </h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Current User:</h4>
            <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Role:</strong> <Badge variant="primary">{user?.role}</Badge></p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>NIM/NIP:</strong> {user?.nim_nip}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Permission Matrix:</h4>
            <div className="space-y-2">
              {permissions.map((perm) => (
                <div key={perm.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono">{perm.name}</code>
                    <span className="text-xs text-gray-500">
                      ({perm.roles.join(', ')})
                    </span>
                  </div>
                  <Badge variant={perm.result ? 'success' : 'secondary'}>
                    {perm.result ? 'TRUE' : 'FALSE'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Access Summary:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className={`p-2 rounded ${isAdmin() ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                Admin Features: {isAdmin() ? '✅ GRANTED' : '❌ DENIED'}
              </div>
              <div className={`p-2 rounded ${isDosen() ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                Dosen Features: {isDosen() ? '✅ GRANTED' : '❌ DENIED'}
              </div>
              <div className={`p-2 rounded ${isLaboran() ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                Laboran Features: {isLaboran() ? '✅ GRANTED' : '❌ DENIED'}
              </div>
              <div className={`p-2 rounded ${isMahasiswa() ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                Mahasiswa Features: {isMahasiswa() ? '✅ GRANTED' : '❌ DENIED'}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}