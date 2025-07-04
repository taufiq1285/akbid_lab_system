import React, { useState, useEffect } from 'react'
import { DatabaseService } from '@/lib/supabase/database'

export const DatabaseTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const [labRooms, setLabRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const result = await DatabaseService.testConnection()
      setConnectionStatus(result)
      
      if (result.success) {
        const rooms = await DatabaseService.getLabRooms()
        setLabRooms(rooms)
      }
    } catch (error) {
      setConnectionStatus({
        success: false,
        message: `Error: ${error}`
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="card-header">
        <h3 className="text-lg font-semibold">🗄️ Database Connection Test</h3>
      </div>
      <div className="card-body space-y-4">
        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-sm text-gray-600">Testing connection...</p>
          </div>
        )}

        {connectionStatus && (
          <div className={`p-3 rounded ${
            connectionStatus.success 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <p className="font-medium">
              {connectionStatus.success ? '✅ Success' : '❌ Failed'}
            </p>
            <p className="text-sm mt-1">{connectionStatus.message}</p>
          </div>
        )}

        {labRooms.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">📍 Lab Rooms ({labRooms.length})</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {labRooms.map((room) => (
                <div key={room.id} className="p-2 bg-gray-50 rounded text-sm">
                  <div className="font-medium">{room.code}</div>
                  <div className="text-gray-600">{room.name}</div>
                  <div className="text-xs text-gray-500">Capacity: {room.capacity}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={testConnection}
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'Testing...' : 'Test Connection Again'}
        </button>
      </div>
    </div>
  )
}