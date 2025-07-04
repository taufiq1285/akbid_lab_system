import React from 'react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple layout wrapper - will enhance later */}
      <main className="container mx-auto py-6">
        {children}
      </main>
    </div>
  )
}