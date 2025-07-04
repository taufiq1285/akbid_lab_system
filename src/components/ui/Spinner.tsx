import React from 'react'
import { cn } from '@/lib/utils/helpers'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div className={cn('animate-spin rounded-full border-b-2 border-current', sizes[size], className)}>
      <span className="sr-only">Loading...</span>
    </div>
  )
}