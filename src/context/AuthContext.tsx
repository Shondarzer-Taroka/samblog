/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  user: any
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

const checkAuth = async () => {
  try {
    const res = await fetch('/api/auth/check', {
      credentials: 'include', // This is crucial
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (res.ok) {
      const data = await res.json()
      setUser(data.user)
    } else {
      setUser(null)
    }
  } catch (error) {
    console.error('Auth check failed:', error)
    setUser(null)
  } finally {
    setLoading(false)
  }
}

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)