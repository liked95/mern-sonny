import { useEffect, useState } from 'react'

export type User = {
  _id: string
  username: string
} | null

type Props = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isFetching: boolean
}

export const useCurrentUser = (): Props => {
  const [user, setUser] = useState<User | null>(null)
  const [isFetching, setIsFetching] = useState(true) // Optional: track loading state

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsFetching(true)

        const response = await fetch('/api/user/', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent
        }).then(res => res.json())

        if (response.success) {
          console.log('response.user: ', response.data)
          setUser(response.data)
        } else {
          console.warn('User fetch failed:', response.message)
          setUser(null)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      } finally {
        setIsFetching(false)
      }
    }

    fetchUser()
  }, [])

  return { user, setUser, isFetching }
}
