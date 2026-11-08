import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Footer() {
  return (
    <footer className="site-footer">
      <p>CampusConnect BU</p>
    </footer>
  )
}

function MainLayout() {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
