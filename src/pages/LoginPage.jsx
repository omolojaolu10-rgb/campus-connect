import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import useAuth from '../hooks/useAuth'
import usePageTitle from '../hooks/usePageTitle'
import { validateEmail } from '../utils/validators'

function LoginPage() {
  const [values, setValues] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState('')
  const { user, login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const destination = location.state?.from || '/discover'
  usePageTitle('Log in')

  if (user) {
    return <Navigate to={destination} replace />
  }

  function getFieldError(name, value) {
    if (name === 'email') return validateEmail(value)
    return value ? '' : 'Password is required.'
  }

  function handleChange(name, value) {
    setValues((previous) => ({ ...previous, [name]: value }))
    setAuthError('')

    if (touched[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: getFieldError(name, value),
      }))
    }
  }

  function handleBlur(name) {
    setTouched((previous) => ({ ...previous, [name]: true }))
    setErrors((previous) => ({
      ...previous,
      [name]: getFieldError(name, values[name]),
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setTouched({ email: true, password: true })

    const validationErrors = {
      email: getFieldError('email', values.email),
      password: getFieldError('password', values.password),
    }
    setErrors(validationErrors)
    if (Object.values(validationErrors).some(Boolean)) return

    setAuthError('')
    setIsSubmitting(true)
    try {
      await login(values.email.trim(), values.password)
      navigate(destination, { replace: true })
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : 'Unable to log in. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="registration-page">
      <section className="registration-card" aria-labelledby="login-title">
        <div className="registration-heading">
          <p className="tagline">WELCOME BACK</p>
          <h1 id="login-title">Log in to CampusConnect</h1>
          <p>Use your Babcock student email to continue.</p>
        </div>

        <form className="registration-form" noValidate onSubmit={handleSubmit}>
          <FormInput
            label="Babcock email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => handleChange('email', event.target.value)}
            onBlur={() => handleBlur('email')}
            error={touched.email ? errors.email : ''}
            autoComplete="email"
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={(event) => handleChange('password', event.target.value)}
            onBlur={() => handleBlur('password')}
            error={touched.password ? errors.password : ''}
            autoComplete="current-password"
          />

          {authError && (
            <p className="login-error" role="alert">
              {authError}
            </p>
          )}

          <button
            className="registration-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className="login-demo-note">
          Development only — demo account: demo@student.babcock.edu.ng /
          Password1
        </p>
        <p className="registration-login">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </div>
  )
}

export default LoginPage
