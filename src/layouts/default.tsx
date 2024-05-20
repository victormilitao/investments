import { Outlet, useNavigate } from "react-router-dom"
import { Header } from "../header"
import { useContext, useEffect } from "react"
import { SessionContext } from "@/contexts/SessionContext"
import { UserStocksProvider } from "@/contexts/UserStocksContext"
import { PatrimonyProvider } from "@/contexts/PatrimonyContext"

export function Default() {
  const navigate = useNavigate()
  const { session } = useContext(SessionContext)

  useEffect(() => {
    if (!session) navigate("/login")
  }, [session])

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
