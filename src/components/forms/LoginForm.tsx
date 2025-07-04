import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '../ui/Button'
import { Input } from '../../components/ui/Input'
import type { LoginCredentials } from '@/types/auth'

export const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const { login, loading, error, isDev, testAccounts, devQuickLogin } = useAuth()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!credentials.email || !credentials.password) {
      setFormError('Email dan password harus diisi')
      return
    }

    const { error: loginError } = await login(credentials)
    if (!loginError) {
      navigate('/dashboard')
    } else {
      setFormError(loginError)
    }
  }

  const handleQuickLogin = async (role: string) => {
    setFormError('')
    const { error: loginError } = await devQuickLogin(role)
    if (!loginError) {
      navigate('/dashboard')
    } else {
      setFormError(loginError)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Login Sistem Akbid
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Masuk ke sistem informasi praktikum
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={credentials.email}
          onChange={(e: { target: { value: any } }) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
          placeholder="email@akbid.com"
          error={formError && !credentials.email ? 'Email harus diisi' : ''}
          required
        />

        <Input
          label="Password"
          type="password"
          value={credentials.password}
          onChange={(e: { target: { value: any } }) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
          placeholder="Masukkan password"
          error={formError && !credentials.password ? 'Password harus diisi' : ''}
          required
        />

        {(formError || error) && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {formError || error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
        >
          {loading ? 'Login...' : 'Login'}
        </Button>
      </form>

      {/* Development Quick Login */}
      {isDev && (
        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            🔧 Development Quick Login
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {testAccounts.map((account) => (
              <Button
                key={account.role}
                variant="secondary"
                size="sm"
                onClick={() => handleQuickLogin(account.role)}
                disabled={loading}
                className="text-xs"
              >
                {account.role.toUpperCase()}
              </Button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Quick login untuk testing (development only)
          </p>
        </div>
      )}

      {/* Manual Test Accounts Info */}
      {isDev && (
        <div className="border-t pt-4">
          <details className="text-xs text-gray-600">
            <summary className="cursor-pointer">Manual Test Accounts</summary>
            <div className="mt-2 space-y-1">
              {testAccounts.map((account) => (
                <div key={account.role} className="font-mono">
                  <strong>{account.role}:</strong> {account.email} / {account.password}
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  )
}