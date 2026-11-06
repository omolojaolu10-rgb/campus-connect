function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <a href="#home" className="brand">
        Campus<span>Connect</span>
      </a>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#discover">Discover</a>
        <a href="#community">Community</a>
      </div>

      <button type="button" className="btn btn-outline">
        Login
      </button>
    </nav>
  )
}

export default Navbar