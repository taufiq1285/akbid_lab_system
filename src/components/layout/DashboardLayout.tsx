import React, { useState } from 'react'
import { Header } from './Header'
import { Navigation } from './Navigation'
import { Sidebar } from './Sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  showNavigation?: boolean
  showSidebar?: boolean
  layoutType?: 'default' | 'sidebar' | 'navigation'
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  showNavigation = true,
  showSidebar = false,
  layoutType = 'default'
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  // Determine layout based on layoutType
  const shouldShowSidebar = layoutType === 'sidebar' || showSidebar
  const shouldShowNavigation = (layoutType === 'navigation' || layoutType === 'default') && showNavigation

  if (shouldShowSidebar) {
    // Sidebar Layout
    return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header with Sidebar Toggle */}
          <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg font-medium text-gray-900">Dashboard</h1>
              <div className="w-10" /> {/* Spacer */}
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    )
  }

  // Default Layout (Header + Navigation)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Role Switcher */}
      <Header />
      
      {/* Navigation Menu */}
      {shouldShowNavigation && <Navigation />}
      
      {/* Main Content */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}