import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button, Card, CardBody } from '@/components/ui'

export const NotFound: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <Card>
          <CardBody className="text-center space-y-6 py-8">
            {/* 404 Icon */}
            <div className="flex justify-center">
              <div className="p-4 bg-blue-100 rounded-full">
                <svg 
                  className="w-12 h-12 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-8a9 9 0 00-9 9m18 0a9 9 0 01-9 9" 
                  />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-6xl font-bold text-gray-900">404</h1>
              <h2 className="text-2xl font-bold text-gray-700">
                Halaman Tidak Ditemukan
              </h2>
              <p className="text-gray-600">
                Maaf, halaman yang Anda cari tidak ditemukan atau mungkin telah dipindahkan.
              </p>
            </div>

            {/* Current User Info */}
            {user && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  Logged in as: <span className="font-medium">{user.name}</span> ({user.role})
                </p>
              </div>
            )}

            {/* Suggestions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">
                💡 Yang bisa Anda lakukan:
              </h3>
              <div className="text-sm text-blue-600 space-y-1 text-left">
                <p>• Periksa kembali URL yang Anda ketik</p>
                <p>• Kembali ke dashboard utama</p>
                <p>• Gunakan navigation menu yang tersedia</p>
                <p>• Hubungi administrator jika masalah berlanjut</p>
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
                  ← Kembali
                </Button>
              </div>
            </div>

            {/* Help Info */}
            <div className="border-t pt-4">
              <p className="text-xs text-gray-500">
                Butuh bantuan? Hubungi support di{' '}
                <span className="font-medium">support@akbid.com</span>
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Development Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-700">
              <strong>🔧 Development Info:</strong> This is the 404 NotFound page component. 
              Users see this when they navigate to a route that doesn't exist.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}