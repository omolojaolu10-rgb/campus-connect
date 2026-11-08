import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero" id="home">
      <p className="tagline">YOUR CAMPUS. YOUR COMMUNITY.</p>

      <h1>
        Find Your People.
        <br />
        Build Your Future.
      </h1>

      <p className="hero-description">
        Connect with coursemates, find study partners, share academic
        resources and build meaningful relationships at Babcock University.
      </p>

      <Link to="/register" className="btn btn-primary btn-large">
        Join CampusConnect
      </Link>
    </section>
  )
}

export default Hero