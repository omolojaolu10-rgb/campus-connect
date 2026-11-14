import { useState } from 'react'
import AuthContext from './AuthContext'
import { mockLogin } from '../services/mockAuthService'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  async function login(email, password) {
    const authenticatedUser = await mockLogin(email, password)
    setUser({
      ...authenticatedUser,
      profile: {
        bio: '',
        department: '',
        level: '',
        courses: [],
        skills: [],
        interests: [],
      },
    })
  }

  function logout() {
    setUser(null)
  }

  function updateProfile(newProfile) {
    setUser((previous) =>
      previous
        ? {
            ...previous,
            profile: {
              ...previous.profile,
              ...newProfile,
            },
          }
        : previous,
    )
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
