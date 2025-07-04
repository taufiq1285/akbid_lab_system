import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Badge, Card, CardBody } from '@/components/ui'

export const DevModeIndicator: React.FC = () => {
  const { isDev, user } = useAuth()

  // Only show in development mode
  if (!isDev) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-yellow-50 border-yellow-200">
        <CardBody className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🔧</span>
              <Badge variant="warning" size="sm">DEVELOPMENT MODE</Badge>
            </div>
          </div>
          
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Environment:</span>
              <span className="font-medium text-yellow-700">Development</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Role:</span>
              <span className="font-medium text-yellow-700">{user?.role || 'None'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Role Switching:</span>
              <span className="font-medium text-green-600">Enabled</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quick Login:</span>
              <span className="font-medium text-green-600">Available</span>
            </div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-yellow-200">
            <p className="text-xs text-yellow-700">
              <strong>⚠️ Production Mode:</strong> All dev features will be hidden
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}