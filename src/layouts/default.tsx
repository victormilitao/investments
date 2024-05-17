import { Outlet, useNavigate } from "react-router-dom"
import { Header } from "../header"
import { useEffect } from "react"
import { useSession } from "@/contexts/SessionContext"
import { UserStocksProvider } from "@/contexts/UserStocksContext"
import { PatrimonyProvider } from "@/contexts/PatrimonyContext"

export function Default() {
  const navigate = useNavigate()
  const { session } = useSession()

  useEffect(() => {
    if (!session) navigate("/login")
  }, [session, navigate])

  if (!session) return null

  return (
    <div>
      <PatrimonyProvider>
        <Header />
      </PatrimonyProvider>
      <div className="p-10">
        <UserStocksProvider>
          <Outlet />
        </UserStocksProvider>
      </div>
    </div>
  )
}
