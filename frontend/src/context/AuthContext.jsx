import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL, getToken, setToken, clearToken } from '../api/axiosClient'

const USERNAME_KEY = 'meditrack_username'
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(getToken())
  const [username, setUsername] = useState(localStorage.getItem(USERNAME_KEY))

  useEffect(() => {
    const handleLogout = () => {
      setTokenState(null)
      setUsername(null)
      localStorage.removeItem(USERNAME_KEY)
    }
    window.addEventListener('auth:logout', handleLogout)
    return () => window.removeEventListener('auth:logout', handleLogout)
  }, [])

  const login = async (usernameInput, password) => {
    const body = new URLSearchParams({ username: usernameInput, password })
    const res = await axios.post(`${BASE_URL}/login`, body)
    setToken(res.data.access_token)
    localStorage.setItem(USERNAME_KEY, usernameInput)
    setTokenState(res.data.access_token)
    setUsername(usernameInput)
  }

  const logout = () => {
    clearToken()
    localStorage.removeItem(USERNAME_KEY)
    setTokenState(null)
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ token, username, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
