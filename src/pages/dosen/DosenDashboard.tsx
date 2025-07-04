import React from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardHeader, CardBody, Badge } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'

export const DosenDashboard: React.FC = () => {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">📚 Mata Kuliah</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">Manage your courses</p>
              <Badge variant="success">Dosen Access</Badge>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">📅 Jadwal Praktikum</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">Schedule practicum</p>
              <Badge variant="success">Dosen Access</Badge>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">✅ Presensi</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">Student attendance</p>
              <Badge variant="success">Dosen Access</Badge>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}