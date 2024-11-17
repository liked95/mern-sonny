import { useCurrentUser, User } from '@/hooks/useCurrentUser'
import { createContext, Dispatch, ReactNode, SetStateAction } from 'react'

interface Props {
  children: ReactNode
}

interface AuthContextValue {
  user: User
  setUser: Dispatch<SetStateAction<User | null>>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthenticatedProvider = (props: Props) => {
  const { user, setUser } = useCurrentUser()

  return <AuthContext.Provider value={{ user, setUser }}>{props.children}</AuthContext.Provider>
}
