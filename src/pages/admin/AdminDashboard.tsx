import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardHeader, CardBody, Badge, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    console.log('🚪 Admin logout initiated')
    const { error } = await logout()
    if (!error) {
      console.log('✅ Logout successful, navigating to /login')
      navigate('/login')
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">👑</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">
                  Selamat datang, {user?.name} - System Administrator
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <Badge variant="primary">{user?.role?.toUpperCase()}</Badge>
              </div>
              <Button variant="secondary" onClick={handleLogout} size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Role Access Status */}
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <h3 className="font-medium text-green-800 mb-2">✅ Admin Access Granted</h3>
          <p className="text-green-600 text-sm">
            You have full administrative privileges. You can access all features and manage the entire system.
          </p>
        </div>

        {/* Admin Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-blue-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                👥 User Management
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Manage system users, roles, and permissions
              </p>
              <div className="space-y-2">
                <Badge variant="primary" size="sm">Admin Only</Badge>
                <p className="text-xs text-gray-500">
                  CRUD operations for all user types
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                🏥 Lab Management
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Configure lab rooms and facilities
              </p>
              <div className="space-y-2">
                <Badge variant="primary" size="sm">Admin Only</Badge>
                <p className="text-xs text-gray-500">
                  9 Labs + 1 Depo configuration
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📚 Mata Kuliah Management
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Manage courses and assignments
              </p>
              <div className="space-y-2">
                <Badge variant="primary" size="sm">Admin Only</Badge>
                <p className="text-xs text-gray-500">
                  Course creation and dosen assignment
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📊 System Reports
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                View comprehensive analytics
              </p>
              <div className="space-y-2">
                <Badge variant="success" size="sm">Full Access</Badge>
                <p className="text-xs text-gray-500">
                  All system reports and metrics
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-yellow-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                🔐 Access Control
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Manage permissions and roles
              </p>
              <div className="space-y-2">
                <Badge variant="warning" size="sm">Super Admin</Badge>
                <p className="text-xs text-gray-500">
                  Role-based access control
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-purple-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                ⚙️ System Settings
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Configure system parameters
              </p>
              <div className="space-y-2">
                <Badge variant="secondary" size="sm">Admin Config</Badge>
                <p className="text-xs text-gray-500">
                  General system configuration
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Quick Navigation */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">🧭 Quick Navigation Test</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600 mb-4">
              As admin, you can access all role-specific dashboards:
            </p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate('/dosen')}
              >
                👨‍🏫 Dosen Dashboard
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate('/laboran')}
              >
                🔬 Laboran Dashboard
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate('/mahasiswa')}
              >
                👩‍🎓 Mahasiswa Dashboard
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                📋 General Dashboard
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}