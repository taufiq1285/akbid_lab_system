import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Badge } from '../ui'

export const SessionDebug: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth()
  const [sessionData, setSessionData] = useState<any>(null)
  
  useEffect(() => {
    // Check session storage directly
    const savedSession = sessionStorage.getItem('akbid_auth_session')
    if (savedSession) {
      try {
        setSessionData(JSON.parse(savedSession))
      } catch (error) {
        console.error('Session parse error:', error)
      }
    }
  }, [])

  const isDev = import.meta.env.VITE_APP_ENV === 'development'
  
  if (!isDev) return null

  return (
    <div className="fixed bottom-4 left-4 bg-black bg-opacity-90 text-white p-4 rounded-lg text-xs font-mono max-w-sm z-50">
      <div className="space-y-2">
        <div className="font-bold text-yellow-400">🔍 Session Debug</div>
        
        <div>
          <strong>Auth State:</strong>
          <div className="ml-2 space-y-1">
            <div>Loading: <Badge variant={loading ? 'warning' : 'success'}>{loading ? 'YES' : 'NO'}</Badge></div>
            <div>Authenticated: <Badge variant={isAuthenticated ? 'success' : 'danger'}>{isAuthenticated ? 'YES' : 'NO'}</Badge></div>
            <div>User: {user?.name || 'None'}</div>
            <div>Role: {user?.role || 'None'}</div>
          </div>
        </div>
        
        <div>
          <strong>Session Storage:</strong>
          <div className="ml-2">
            {sessionData ? (
              <div className="space-y-1">
                <div>Name: {sessionData.name}</div>
                <div>Role: {sessionData.role}</div>
                <div>Email: {sessionData.email}</div>
              </div>
            ) : (
              <div className="text-red-400">No session found</div>
            )}
          </div>
        </div>
        
        <div>
          <strong>URL:</strong> {window.location.pathname}
        </div>
      </div>
    </div>
  )
}