import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button, Card, CardBody, Badge } from '@/components/ui'

export const Unauthorized: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleGoBack = () => {
    navigate(-1) // Go back to previous page
  }

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <Card>
          <CardBody className="text-center space-y-6 py-8">
            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="p-4 bg-red-100 rounded-full">
                <svg 
                  className="w-12 h-12 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
                  />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                ⛔ Akses Ditolak
              </h1>
              <p className="text-lg text-gray-600">
                Anda tidak memiliki izin untuk mengakses halaman ini
              </p>
            </div>

            {/* User Info */}
            {user && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-center space-x-3">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Logged in as:</p>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <Badge 
                      variant={
                        user.role === 'admin' ? 'primary' :
                        user.role === 'dosen' ? 'success' :
                        user.role === 'laboran' ? 'warning' :
                        user.role === 'mahasiswa' ? 'secondary' :
                        'danger'
                      }
                      className="mt-1"
                    >
                      {user.role.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Error Details */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-medium text-red-800 mb-2">
                🚫 Mengapa saya tidak bisa akses?
              </h3>
              <div className="text-sm text-red-600 space-y-1 text-left">
                <p>• Halaman ini memerlukan role/permission khusus</p>
                <p>• Role Anda saat ini: <strong>{user?.role || 'Unknown'}</strong></p>
                <p>• Silakan hubungi administrator jika perlu akses</p>
                <p>• Atau gunakan akun dengan role yang sesuai</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="primary" 
                  onClick={handleGoHome}
                  className="flex-1"
                >
                  🏠 Kembali ke Dashboard
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleGoBack}
                  className="flex-1"
                >
                  ← Kembali ke Halaman Sebelumnya
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="w-full text-gray-500 hover:text-gray-700"
              >
                🚪 Logout dan Login dengan Akun Lain
              </Button>
            </div>

            {/* Support Info */}
            <div className="border-t pt-4">
              <p className="text-xs text-gray-500">
                Need help? Contact system administrator at{' '}
                <span className="font-medium">admin@akbid.com</span>
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Development Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-700">
              <strong>🔧 Development Info:</strong> This is the Unauthorized page component. 
              Users see this when they try to access pages they don't have permission for.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}