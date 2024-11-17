import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '@/hooks/useAuthContext'
import { User } from '@/hooks/useCurrentUser'

export function withAuth<T extends object>(
  Component: React.ComponentType<
    T & {
      currentUser: User
    }
  >
): React.FC<T> {
  return (props: T) => {
    const { user } = useAuthContext()

    if (!user) {
      return <Navigate to="/login" replace />
    }

    return <Component {...props} currentUser={user} />
  }
}
