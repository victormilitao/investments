import { Session } from "@/interfaces/session"
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type SessionContextType = {
  session: Session | null
  setSession: (session: Session | null) => void
}

export const SessionContext = createContext<SessionContextType>({
  session: null,
  setSession: () => {},
})

export const useSession = () => useContext(SessionContext)

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(() => {
    const sessionString = localStorage.getItem("session")
    return sessionString ? JSON.parse(sessionString) : null
  })

  useEffect(() => {
    localStorage.setItem("session", JSON.stringify(session))
  }, [session])

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  )
}
