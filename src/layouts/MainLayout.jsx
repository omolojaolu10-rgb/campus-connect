import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Footer() {
  return (
    <footer className="site-footer">
      <p>CampusConnect BU</p>
    </footer>
  )
}

function MainLayout() {
  const location = useLocation()
  const mainRef = useRef(null)

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.focus()
    }
  }, [location.pathname])

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="site-header">
        <Navbar />
      </header>

      <main id="main-content" ref={mainRef} tabIndex={-1} className="app-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
