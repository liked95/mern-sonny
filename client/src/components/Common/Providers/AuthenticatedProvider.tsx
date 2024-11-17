import { useCurrentUser, User } from '@/hooks/useCurrentUser'
import { createContext, Dispatch, ReactNode, SetStateAction } from 'react'

interface Props {
  children: ReactNode
}

interface AuthContextValue {
  user: User
  setUser: Dispatch<SetStateAction<User | null>>
  isFetching: boolean
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthenticatedProvider = (props: Props) => {
  const { user, setUser, isFetching } = useCurrentUser()

  return (
    <AuthContext.Provider value={{ user, setUser, isFetching }}>
      {props.children}
    </AuthContext.Provider>
  )
}
