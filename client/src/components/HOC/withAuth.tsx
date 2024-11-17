import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '@/hooks/useAuthContext'

export function withAuth<T extends object>(Component: React.ComponentType<T>): React.FC<T> {
  return (props: T) => {
    const { user, isFetching } = useAuthContext()
    // Show a loading state until user data is fetched
    if (isFetching) {
      return <div>Loading...</div>
    }

    // Redirect to login if user is not authenticated
    if (!user) {
      return <Navigate to="/login" replace />
    }

    return <Component {...props} />
  }
}
