import { Session } from '@/interfaces/session'
import { api } from '@/lib/api'
import React, {
  ReactNode,
  createContext, useEffect, useState
} from 'react'

type SessionContextType = {
  session: Session | null
  setSession: (session: Session | null) => void
}

export const SessionContext = createContext<SessionContextType>({
  session: null,
  setSession: () => {},
})

export const getSession = (): Session | null => {
  const sessionStorage = localStorage.getItem('session')
  if (sessionStorage) return JSON.parse(sessionStorage)
  return null
}

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(() => {
    return getSession()
  })

  const handleSession = (newSession: Session | null) => {
    newSession
      ? localStorage.setItem('session', JSON.stringify(newSession))
      : localStorage.removeItem('session')

    setSession(newSession)
  }

  useEffect(() => {
    const token = getSession()?.user?.token
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }, [])

  return (
    <SessionContext.Provider value={{ session, setSession: handleSession }}>
      {children}
    </SessionContext.Provider>
  )
}
