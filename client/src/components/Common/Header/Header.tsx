import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/hooks/useAuthContext'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { setUser } = useAuthContext()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      }).then(res => res.json())

      console.log('response', response)
      if (response.success) {
        navigate('/login')
        setUser(null)
        localStorage.remove('user')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="header">
      <h1>Spectre The Darkness</h1>
      <nav className="header-nav">
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </nav>
    </header>
  )
}

export default Header
