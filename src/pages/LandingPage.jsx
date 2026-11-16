import Hero from '../components/Hero'
import usePageTitle from '../hooks/usePageTitle'

function LandingPage() {
  usePageTitle('Home')

  return <Hero />
}

export default LandingPage
