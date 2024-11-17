import { useAuthContext } from '@/hooks/useAuthContext'
import React from 'react'
import { Navigate } from 'react-router-dom'

export function withAuth<T extends object>(Component: React.ComponentType<T>): React.FC<T> {
  return (props: T) => {
    const { user } = useAuthContext()

    if (!user) {
      console.log('user not exist go here')
      return <Navigate to="/login" replace />
    }

    return <Component {...props} currentUser={user} />
  }
}
