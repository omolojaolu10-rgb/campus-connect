import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
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
        <NavLink to="/login" className="btn btn-outline" onClick={closeMenu}>
          Login
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar