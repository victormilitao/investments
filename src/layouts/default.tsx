import { Outlet, useNavigate } from "react-router-dom"
import { Header } from "../header"
import { useEffect } from "react"
import { useSession } from "@/contexts/SessionContext"

export function Default() {
  const navigate = useNavigate()
  const { session } = useSession()

  useEffect(() => {
    if (!session) navigate("/login")
  }, [session, navigate])

  if (!session) return null

  return (
    <div>
      <Header />
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  )
}
