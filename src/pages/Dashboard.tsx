import React from 'react'
import { useNavigate } from 'react-router-dom' // Add this import
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { useAuth } from '../hooks/useAuth'
import { DatabaseTest } from '../components/common/DatabaseTest'
import { Button, Card, CardHeader, CardBody, Badge, Alert } from '../components/ui'
import type { User } from '../types/auth'

export const Dashboard: React.FC = () => {
  const navigate = useNavigate() // Add this hook
  const { 
    user, 
    logout, 
    isAdmin, 
    isDosen, 
    isLaboran, 
    isMahasiswa, 
    isDevSuper 
  } = useAuth()

  const safeUser = user as User | null

  // Enhanced logout with navigation
  const handleLogout = async () => {
    console.log('🚪 Dashboard logout initiated')
    const { error } = await logout()
    if (!error) {
      console.log('✅ Logout successful, navigating to /login')
      navigate('/login')
    } else {
      console.error('❌ Logout error:', error)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🏥 Dashboard Sistem Akbid
              </h1>
              <p className="text-gray-600">
                Selamat datang, {safeUser?.name}
              </p>
            </div>
            
            {safeUser && (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{safeUser.name}</p>
                  <Badge 
                    variant={
                      safeUser.role === 'admin' ? 'primary' :
                      safeUser.role === 'dosen' ? 'success' :
                      safeUser.role === 'laboran' ? 'warning' :
                      safeUser.role === 'mahasiswa' ? 'secondary' :
                      'danger'
                    }
                  >
                    {safeUser.role.toUpperCase()}
                  </Badge>
                </div>
                <Button 
                  variant="secondary" 
                  onClick={handleLogout} // Use enhanced logout
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Rest of component remains the same... */}
        
        {/* Phase 1 Completion Status */}
        <Alert variant="success">
          <div>
            <h3 className="font-medium mb-2">✅ Phase 1: Foundation Setup Complete!</h3>
            <div className="text-sm space-y-1">
              <p>✅ Day 1-2: Environment & Project Setup</p>
              <p>✅ Day 3-4: Supabase & Database Setup</p>
              <p>✅ Day 5-7: Core Configuration & Basic Routing</p>
              <p className="font-medium text-green-700">🎯 Ready untuk Week 2-3: Core Features!</p>
            </div>
          </div>
        </Alert>

        {/* Basic Role Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-blue-500">
            <CardBody>
              <h4 className="font-medium text-gray-900 mb-2">👑 Admin Access</h4>
              {isAdmin() ? (
                <div className="text-green-600 text-sm">
                  ✅ You have admin access
                  <p className="mt-1"><Badge variant="primary" size="sm">Available</Badge></p>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">❌ Access denied</div>
              )}
            </CardBody>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardBody>
              <h4 className="font-medium text-gray-900 mb-2">👨‍🏫 Dosen Access</h4>
              {isDosen() || isAdmin() ? (
                <div className="text-green-600 text-sm">
                  ✅ You have dosen access
                  <p className="mt-1"><Badge variant="success" size="sm">Available</Badge></p>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">❌ Access denied</div>
              )}
            </CardBody>
          </Card>

          <Card className="border-l-4 border-yellow-500">
            <CardBody>
              <h4 className="font-medium text-gray-900 mb-2">🔬 Laboran Access</h4>
              {isLaboran() || isAdmin() ? (
                <div className="text-green-600 text-sm">
                  ✅ You have laboran access
                  <p className="mt-1"><Badge variant="warning" size="sm">Available</Badge></p>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">❌ Access denied</div>
              )}
            </CardBody>
          </Card>

          <Card className="border-l-4 border-purple-500">
            <CardBody>
              <h4 className="font-medium text-gray-900 mb-2">👩‍🎓 Mahasiswa Access</h4>
              {isMahasiswa() || isAdmin() ? (
                <div className="text-green-600 text-sm">
                  ✅ You have mahasiswa access
                  <p className="mt-1"><Badge variant="secondary" size="sm">Available</Badge></p>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">❌ Access denied</div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Database Test */}
        <DatabaseTest />

        {/* Logout Test Section */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">
              🔐 Logout Functionality Test
            </h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-blue-700 text-sm mb-3">
                  <strong>Test Logout:</strong> Click logout button should immediately redirect to login page.
                </p>
                <Button 
                  variant="danger" 
                  onClick={handleLogout}
                  size="sm"
                >
                  🚪 Test Logout
                </Button>
              </div>
              
              <div className="text-xs text-gray-600">
                <p><strong>Expected Behavior:</strong></p>
                <ol className="list-decimal list-inside space-y-1 mt-1">
                  <li>Click logout → Clear session</li>
                  <li>Immediately redirect to /login</li>
                  <li>No need to refresh</li>
                  <li>Login form appears</li>
                </ol>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Next Steps Preview */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">
              🚀 What's Next: Week 2-3 Core Features
            </h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Week 2: Authentication Enhancement</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Enhanced route guards</li>
                  <li>• Permission management</li>
                  <li>• Role-specific layouts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Week 3: Core CRUD Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• User Management (Admin)</li>
                  <li>• Lab Management (Admin)</li>
                  <li>• Mata Kuliah Features (Dosen)</li>
                  <li>• Inventaris Features (Laboran)</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}