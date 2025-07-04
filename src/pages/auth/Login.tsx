import React from 'react'
import { LoginForm } from '@/components/forms/LoginForm'

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Sistem Informasi Praktikum</p>
        <p>Akademi Kebidanan Mega Buana</p>
      </div>
    </div>
  )
}