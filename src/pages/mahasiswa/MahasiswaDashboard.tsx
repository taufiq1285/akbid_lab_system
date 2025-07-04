import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardHeader, CardBody, Badge, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'

export const MahasiswaDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout, isAdmin } = useAuth()

  const handleLogout = async () => {
    console.log('🚪 Mahasiswa logout initiated')
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
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-2xl">👩‍🎓</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Mahasiswa Dashboard
                </h1>
                <p className="text-gray-600">
                  Selamat datang, {user?.name} - Mahasiswa
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <Badge variant="secondary">{user?.role?.toUpperCase()}</Badge>
              </div>
              <Button variant="secondary" onClick={handleLogout} size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Role Access Status */}
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
          <h3 className="font-medium text-purple-800 mb-2">✅ Mahasiswa Access Granted</h3>
          <p className="text-purple-600 text-sm">
            You have access to view your academic information and submit assignments.
            {isAdmin() && ' (Plus admin privileges)'}
          </p>
        </div>

        {/* Mahasiswa Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-purple-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📅 Jadwal View
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                View your practicum schedule
              </p>
              <div className="space-y-2">
                <Badge variant="secondary" size="sm">Student Access</Badge>
                <p className="text-xs text-gray-500">
                  Read-only schedule viewing
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p><strong>Features:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>View upcoming practicum</li>
                    <li>Check lab room assignments</li>
                    <li>See time schedules</li>
                    <li>Download schedule PDF</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-purple-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📖 Materi Access
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Access course materials and resources
              </p>
              <div className="space-y-2">
                <Badge variant="secondary" size="sm">Student Access</Badge>
                <p className="text-xs text-gray-500">
                  Download study materials
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p><strong>Materials:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Practicum guidelines</li>
                    <li>Reference materials</li>
                    <li>Video tutorials</li>
                    <li>Case studies</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-purple-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📤 Laporan Upload
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Submit your practicum reports
              </p>
              <div className="space-y-2">
                <Badge variant="warning" size="sm">Upload System</Badge>
                <p className="text-xs text-gray-500">
                  Submit assignments and reports
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p><strong>Submissions:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Upload report files</li>
                    <li>Submit before deadline</li>
                    <li>Check submission status</li>
                    <li>View feedback</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                📊 Nilai View
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                View your grades and assessment results
              </p>
              <div className="space-y-2">
                <Badge variant="success" size="sm">Grade Viewing</Badge>
                <p className="text-xs text-gray-500">
                  Academic performance tracking
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p><strong>Grade Info:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Practicum scores</li>
                    <li>Assignment grades</li>
                    <li>Overall assessment</li>
                    <li>Grade history</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                ✅ Presensi View
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Check your attendance record
              </p>
              <div className="space-y-2">
                <Badge variant="primary" size="sm">Attendance</Badge>
                <p className="text-xs text-gray-500">
                  Attendance history and statistics
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p><strong>Attendance:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>View attendance history</li>
                    <li>Check absence records</li>
                    <li>See attendance percentage</li>
                    <li>Download attendance report</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-gray-500">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                👤 Profile Settings
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Manage your profile information
              </p>
              <div className="space-y-2">
                <Badge variant="secondary" size="sm">Profile Management</Badge>
                <p className="text-xs text-gray-500">
                  Update personal information
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p><strong>Profile:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Update contact info</li>
                    <li>Change password</li>
                    <li>Upload profile photo</li>
                    <li>View academic info</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Student Information */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">👩‍🎓 Student Information</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium text-gray-700 mb-2">Academic Info</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>NIM:</strong> {user?.nim_nip || 'Not set'}</p>
                  <p><strong>Name:</strong> {user?.name}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Status:</strong> <Badge variant="success" size="sm">Active</Badge></p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium text-gray-700 mb-2">Current Semester</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Semester:</strong> 6 (Example)</p>
                  <p><strong>Credit Load:</strong> 18 SKS</p>
                  <p><strong>GPA:</strong> 3.75</p>
                  <p><strong>Status:</strong> <Badge variant="success" size="sm">Good Standing</Badge></p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium text-gray-700 mb-2">Quick Stats</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Practicum:</strong> 5 courses</p>
                  <p><strong>Attendance:</strong> 92%</p>
                  <p><strong>Reports:</strong> 3 pending</p>
                  <p><strong>Grades:</strong> <Badge variant="success" size="sm">Up to date</Badge></p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

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
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-500">
                    ❌ Admin/Dosen/Laboran access denied (Student role)
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}