import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormInput from '../components/FormInput'
import { DEPARTMENTS, LEVELS } from '../config/appConfig'
import {
  validateConfirmPassword,
  validateDepartment,
  validateEmail,
  validateFullName,
  validateLevel,
  validateMatricNumber,
  validatePassword,
} from '../utils/validators'

const FIELD_NAMES = [
  'fullName',
  'email',
  'matricNumber',
  'department',
  'level',
  'password',
  'confirmPassword',
]

const FIELD_VALIDATORS = {
  fullName: validateFullName,
  email: validateEmail,
  matricNumber: validateMatricNumber,
  department: validateDepartment,
  level: validateLevel,
  password: validatePassword,
}

function getFieldError(name, values) {
  if (name === 'confirmPassword') {
    return validateConfirmPassword(values.confirmPassword, values.password)
  }
  return FIELD_VALIDATORS[name](values[name])
}

function getFormErrors(values) {
  return Object.fromEntries(
    FIELD_NAMES.map((name) => [name, getFieldError(name, values)]),
  )
}

function RegisterPage() {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    matricNumber: '',
    department: '',
    level: '',
    password: '',
    confirmPassword: '',
  })
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)

  function handleChange(name, value) {
    const updatedValues = { ...values, [name]: value }
    setValues(updatedValues)
    setIsSuccessful(false)
    setErrors((previous) => {
      const updatedErrors = { ...previous }
      if (touched[name]) {
        updatedErrors[name] = getFieldError(name, updatedValues)
      }
      if (name === 'password' && touched.confirmPassword) {
        updatedErrors.confirmPassword = getFieldError(
          'confirmPassword',
          updatedValues,
        )
      }
      return updatedErrors
    })
  }

  function handleBlur(name) {
    setTouched((previous) => ({ ...previous, [name]: true }))
    setErrors((previous) => ({
      ...previous,
      [name]: getFieldError(name, values),
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setTouched(Object.fromEntries(FIELD_NAMES.map((name) => [name, true])))

    const validationErrors = getFormErrors(values)
    setErrors(validationErrors)
    if (Object.values(validationErrors).some(Boolean)) return

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setValues((previous) => ({
        ...previous,
        password: '',
        confirmPassword: '',
      }))
      setIsSuccessful(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="registration-page">
      <section className="registration-card" aria-labelledby="register-title">
        <div className="registration-heading">
          <p className="tagline">JOIN YOUR CAMPUS COMMUNITY</p>
          <h1 id="register-title">Create your account</h1>
          <p>Register with your Babcock student details.</p>
        </div>

        {isSuccessful ? (
          <div className="registration-success" role="status">
            <h2>Registration successful!</h2>
            <p>
              Your details were validated in this demo. You can now{' '}
              <Link to="/login">log in</Link>.
            </p>
          </div>
        ) : (
          <form className="registration-form" noValidate onSubmit={handleSubmit}>
            <FormInput
              label="Full name"
              name="fullName"
              value={values.fullName}
              onChange={(event) => handleChange('fullName', event.target.value)}
              onBlur={() => handleBlur('fullName')}
              error={touched.fullName ? errors.fullName : ''}
              autoComplete="name"
            />
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
              label="Matric number"
              name="matricNumber"
              value={values.matricNumber}
              onChange={(event) =>
                handleChange('matricNumber', event.target.value)
              }
              onBlur={() => handleBlur('matricNumber')}
              error={touched.matricNumber ? errors.matricNumber : ''}
              autoComplete="off"
            />
            <FormInput
              label="Department"
              name="department"
              type="select"
              value={values.department}
              onChange={(event) =>
                handleChange('department', event.target.value)
              }
              onBlur={() => handleBlur('department')}
              error={touched.department ? errors.department : ''}
              options={DEPARTMENTS}
            />
            <FormInput
              label="Level"
              name="level"
              type="select"
              value={values.level}
              onChange={(event) => handleChange('level', event.target.value)}
              onBlur={() => handleBlur('level')}
              error={touched.level ? errors.level : ''}
              options={LEVELS.map(String)}
            />

            <button
              className="password-toggle"
              type="button"
              aria-pressed={showPasswords}
              onClick={() => setShowPasswords((previous) => !previous)}
            >
              {showPasswords ? 'Hide passwords' : 'Show passwords'}
            </button>

            <FormInput
              label="Password"
              name="password"
              type={showPasswords ? 'text' : 'password'}
              value={values.password}
              onChange={(event) => handleChange('password', event.target.value)}
              onBlur={() => handleBlur('password')}
              error={touched.password ? errors.password : ''}
              autoComplete="new-password"
            />
            <FormInput
              label="Confirm password"
              name="confirmPassword"
              type={showPasswords ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={(event) =>
                handleChange('confirmPassword', event.target.value)
              }
              onBlur={() => handleBlur('confirmPassword')}
              error={
                touched.confirmPassword ? errors.confirmPassword : ''
              }
              autoComplete="new-password"
            />

            <button
              className="registration-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Create account'}
            </button>
          </form>
        )}

        <p className="registration-login">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  )
}

export default RegisterPage
