import { AuthContext } from '@/components/Common/Providers/AuthenticatedProvider'
import { useContext } from 'react'

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthenticatedProvider')
  }

  return context
}
