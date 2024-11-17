import { useEffect, useState } from 'react'

export type User = {
  _id: string
  username: string
} | null

type Props = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const useCurrentUser = (): Props => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user state from localStorage or sessionStorage
    try {
      const storedUser = localStorage.getItem('user')
      console.log('🚀 ~ useCurrentUser ~ storedUser:', storedUser)
      return storedUser ? JSON.parse(storedUser) : null
    } catch (error) {
      console.error('Invalid user data in localStorage. Clearing it.', error)
      localStorage.removeItem('user') // Remove invalid data
      return null
    }
  })

  useEffect(() => {
    if (!user) {
      async function fetchUser() {
        try {
          const response = await fetch('/api/user/').then(res => res.json())
          if (response.success) {
            setUser(response.user)
            localStorage.setItem('user', JSON.stringify(response.user))
          } else {
            setUser(null)
            localStorage.removeItem('user')
          }
        } catch (error) {
          console.log('Error fetching user:', error)
          setUser(null)
          localStorage.removeItem('user')
        }
      }
      fetchUser()
    }
  }, [user])

  return { user, setUser }
}
