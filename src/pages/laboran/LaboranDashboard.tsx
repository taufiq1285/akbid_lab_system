import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardHeader, CardBody, Badge, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'

export const LaboranDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout, isAdmin } = useAuth()

  const handleLogout = async () => {
    console.log('🚪 Laboran logout initiated')
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
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-2xl">🔬</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Laboran Dashboard
                </h1>
                <p className="text-gray-600">
                  Selamat datang, {user?.name} - Laboran
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <Badge variant="warning">{user?.role?.toUpperCase()}</Badge>
              </div>
              <Button variant="secondary" onClick={handleLogout} size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Role Access Status */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <h3 className="font-medium text-yellow-800 mb-2">✅ Laboran Access Granted</h3>
          <p className="text-yellow-600 text-sm">
            You have access to laboratory equipment and inventory management.
            {isAdmin() && ' (Plus admin privileges)'}
          </p>
        </div>

        {/* Laboran Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-yellow-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                🔬 Inventaris Alat
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Manage laboratory equipment inventory
              </p>
              <div className="space-y-2">
                <Badge variant="warning" size="sm">Laboran Access</Badge>
                <p className="text-xs text-gray-500">
                  CRUD operations for all lab equipment
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p><strong>Features:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Add new equipment</li>
                    <li>Update equipment status</li>
                    <li>Track equipment condition</li>
                    <li>Equipment categorization</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-yellow-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📋 Peminjaman Approval
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Approve or reject equipment borrowing requests
              </p>
              <div className="space-y-2">
                <Badge variant="warning" size="sm">Approval System</Badge>
                <p className="text-xs text-gray-500">
                  Manage borrowing workflow
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p><strong>Workflow:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Review dosen requests</li>
                    <li>Check equipment availability</li>
                    <li>Approve/reject requests</li>
                    <li>Track returned items</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📦 Stock Opname
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Conduct regular inventory checks and updates
              </p>
              <div className="space-y-2">
                <Badge variant="primary" size="sm">Inventory Management</Badge>
                <p className="text-xs text-gray-500">
                  Regular stock verification
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p><strong>Activities:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Monthly stock counting</li>
                    <li>Equipment condition assessment</li>
                    <li>Loss/damage reporting</li>
                    <li>Procurement planning</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-red-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                🔧 Maintenance Alat
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Schedule and track equipment maintenance
              </p>
              <div className="space-y-2">
                <Badge variant="danger" size="sm">Maintenance System</Badge>
                <p className="text-xs text-gray-500">
                  Equipment care and repair
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p><strong>Maintenance:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Preventive maintenance scheduling</li>
                    <li>Repair tracking</li>
                    <li>Maintenance history</li>
                    <li>Equipment lifecycle management</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📊 Laporan Inventaris
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Generate inventory and usage reports
              </p>
              <div className="space-y-2">
                <Badge variant="success" size="sm">Reporting</Badge>
                <p className="text-xs text-gray-500">
                  Comprehensive inventory analytics
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p><strong>Reports:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Equipment utilization</li>
                    <li>Maintenance costs</li>
                    <li>Borrowing statistics</li>
                    <li>Procurement recommendations</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-purple-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                🏗️ Lab Room Management
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Coordinate lab room usage and setup
              </p>
              <div className="space-y-2">
                <Badge variant="secondary" size="sm">Coordination</Badge>
                <p className="text-xs text-gray-500">
                  9 Labs + 1 Depo coordination
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p><strong>Room Types:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Lab Keterampilan Dasar</li>
                    <li>Lab ANC, PNC, INC</li>
                    <li>Lab BBL & KB</li>
                    <li>Lab Konseling & Komunitas</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Navigation */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">🧭 Quick Navigation</h3>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {isAdmin() && (
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => navigate('/admin')}
                >
                  👑 Admin Dashboard
                </Button>
              )}
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                📋 General Dashboard
              </Button>
              {!isAdmin() && (
                <p className="text-sm text-gray-500 flex items-center">
                  ❌ Admin access denied (Laboran role)
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}