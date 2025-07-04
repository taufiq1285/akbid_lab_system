import React from 'react'
import { AppRouter } from './routes'
import { SessionDebug } from './components/common/SessionDebug'
import './index.css'

function App() {
  return (
    <>
      <AppRouter />
      <SessionDebug />
    </>
  )
}

export default App