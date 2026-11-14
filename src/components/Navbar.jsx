import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function handleLogout() {
    logout()
    closeMenu()
    navigate('/')
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <NavLink to="/" end className="brand" onClick={closeMenu}>
        Campus<span>Connect</span>
      </NavLink>

      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <span aria-hidden="true">{isMenuOpen ? '×' : '☰'}</span>
      </button>

      <div
        className={`nav-links${isMenuOpen ? ' is-open' : ''}`}
        id="primary-navigation"
      >
        <NavLink to="/" end onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/discover" onClick={closeMenu}>
          Discover
        </NavLink>
        {user ? (
          <>
            <NavLink to="/profile" onClick={closeMenu}>
              Profile
            </NavLink>
            <span className="nav-user-name">
              {user.name.split(' ')[0]}
            </span>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="btn btn-outline"
              onClick={closeMenu}
            >
              Login
            </NavLink>
            <NavLink to="/register" onClick={closeMenu}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar