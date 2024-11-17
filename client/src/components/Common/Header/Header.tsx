import React from 'react'
import './Header.css'
import { useNavigate, Link } from 'react-router-dom'
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
        setUser(null)
        navigate('/login')
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="header">
      <h1>Spectre The Darkness</h1>
      <nav className="header-nav">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
