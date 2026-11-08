import {
  ALLOWED_EMAIL_DOMAIN,
  DEPARTMENTS,
  LEVELS,
} from '../config/appConfig'

export function validateFullName(value) {
  const name = value.trim()
  if (!name) return 'Full name is required.'
  if (name.length < 2 || name.length > 60) {
    return 'Full name must be between 2 and 60 characters.'
  }
  return ''
}

export function validateEmail(value) {
  const email = value.trim()
  if (!email) return 'Babcock email is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Enter a valid email address.'
  }
  if (!email.toLowerCase().endsWith(`@${ALLOWED_EMAIL_DOMAIN.toLowerCase()}`)) {
    return `Email must end with @${ALLOWED_EMAIL_DOMAIN}.`
  }
  return ''
}

export function validateMatricNumber(value) {
  const matricNumber = value.trim()
  if (!matricNumber) return 'Matric number is required.'
  if (
    matricNumber.length < 5 ||
    matricNumber.length > 20 ||
    !/^[a-zA-Z0-9/]+$/.test(matricNumber)
  ) {
    return 'Use 5–20 letters, numbers, or slashes.'
  }
  return ''
}

export function validateDepartment(value) {
  if (!value) return 'Select a department.'
  if (!DEPARTMENTS.includes(value)) return 'Select a listed department.'
  return ''
}

export function validateLevel(value) {
  if (!value) return 'Select your level.'
  if (!LEVELS.some((level) => String(level) === value)) {
    return 'Select a listed level.'
  }
  return ''
}

export function validatePassword(value) {
  if (!value) return 'Password is required.'
  if (value.length < 8) return 'Password must be at least 8 characters.'
  if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
    return 'Password must include at least one letter and one number.'
  }
  return ''
}

export function validateConfirmPassword(value, password) {
  if (!value) return 'Please confirm your password.'
  if (value !== password) return 'Passwords do not match.'
  return ''
}
