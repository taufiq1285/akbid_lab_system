import React from 'react'
import { AppRouter } from './routes'
import { SessionDebug } from './components/common/SessionDebug'
import { DevModeIndicator } from './components/common/DevModeIndicator'
import './index.css'

function App() {
  return (
    <>
      <AppRouter />
      <SessionDebug />
      <DevModeIndicator />
    </>
  )
}

export default App