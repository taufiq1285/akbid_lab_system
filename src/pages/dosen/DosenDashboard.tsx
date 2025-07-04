import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardHeader, CardBody, Badge, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'

export const DosenDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout, isAdmin } = useAuth()

  const handleLogout = async () => {
    console.log('🚪 Dosen logout initiated')
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
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Dosen Dashboard
                </h1>
                <p className="text-gray-600">
                  Selamat datang, {user?.name} - Dosen
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <Badge variant="success">{user?.role?.toUpperCase()}</Badge>
              </div>
              <Button variant="secondary" onClick={handleLogout} size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Role Access Status */}
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <h3 className="font-medium text-green-800 mb-2">✅ Dosen Access Granted</h3>
          <p className="text-green-600 text-sm">
            You have access to teaching and course management features.
            {isAdmin() && ' (Plus admin privileges)'}
          </p>
        </div>

        {/* Dosen Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-green-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📚 Mata Kuliah Management
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Manage your assigned courses
              </p>
              <div className="space-y-2">
                <Badge variant="success" size="sm">Dosen Access</Badge>
                <p className="text-xs text-gray-500">
                  Create and manage course content
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📅 Jadwal Praktikum
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Schedule and manage practicum sessions
              </p>
              <div className="space-y-2">
                <Badge variant="success" size="sm">Dosen Access</Badge>
                <p className="text-xs text-gray-500">
                  Lab room scheduling and management
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                ✅ Presensi Mahasiswa
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Track student attendance manually
              </p>
              <div className="space-y-2">
                <Badge variant="success" size="sm">Dosen Access</Badge>
                <p className="text-xs text-gray-500">
                  Manual attendance recording
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📖 Materi Praktikum
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Upload and manage course materials
              </p>
              <div className="space-y-2">
                <Badge variant="primary" size="sm">Content Management</Badge>
                <p className="text-xs text-gray-500">
                  File upload and material sharing
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-yellow-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📋 Laporan Review
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Review student reports and assignments
              </p>
              <div className="space-y-2">
                <Badge variant="warning" size="sm">Review System</Badge>
                <p className="text-xs text-gray-500">
                  Grade and provide feedback
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-purple-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                🔬 Peminjaman Alat
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Request lab equipment for practicum
              </p>
              <div className="space-y-2">
                <Badge variant="secondary" size="sm">Request System</Badge>
                <p className="text-xs text-gray-500">
                  Equipment borrowing requests
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-indigo-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📊 Penilaian Mahasiswa
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Grade and evaluate student performance
              </p>
              <div className="space-y-2">
                <Badge variant="secondary" size="sm">Assessment</Badge>
                <p className="text-xs text-gray-500">
                  Student evaluation and grading
                </p>
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
                  ❌ Admin access denied (Dosen role)
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}