import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Footer from './components/Common/Footer/Footer'
import Header from './components/Common/Header/Header'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import { AuthenticatedProvider } from './components/Common/Providers/AuthenticatedProvider'
import { withAuth } from './components/HOC/withAuth'

const AuthedDashboard = withAuth(Dashboard)

function App() {
  const location = useLocation()
  const isAuthPage = ['/login', '/signup'].includes(location.pathname)
  
  return (
    <AuthenticatedProvider>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<AuthedDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </AuthenticatedProvider>
  )
}

const AppWithRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWithRouter
