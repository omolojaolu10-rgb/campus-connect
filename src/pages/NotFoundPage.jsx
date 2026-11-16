import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'

function NotFoundPage() {
  usePageTitle('Page not found')

  return (
    <div>
      <h1>Page not found</h1>
      <Link to="/">Return home</Link>
    </div>
  )
}

export default NotFoundPage
