import { useState } from 'react'
import AuthContext from './AuthContext'
import { mockLogin } from '../services/mockAuthService'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  async function login(email, password) {
    const authenticatedUser = await mockLogin(email, password)
    setUser(authenticatedUser)
  }

  function logout() {
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
