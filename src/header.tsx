import { Link } from "react-router-dom"
import { Eye, EyeOff, LoaderCircle, Power } from "lucide-react"
import { useSession } from "./contexts/SessionContext"
import { PatrimonyContext } from "./contexts/PatrimonyContext"
import { useContext, useEffect, useState } from "react"
import { currencyFormatter } from "./lib/formatter"

export function Header() {
  const { session, setSession } = useSession()
  const { patrimony, getPatrimony } = useContext(PatrimonyContext)
  const [showPatrimony, setShowPatrimony] = useState<boolean>(false)
  const name = session?.user?.name

  useEffect(() => {
    getPatrimony()
  }, [])

  function handleLogout(): void {
    setSession(null)
  }

  function togglePatrimony(): void {
    setShowPatrimony(!showPatrimony)
  }

  return (
    <header className="min-h-[100px] bg-ds-black-500 px-10 flex items-center">
      <div className="flex items-center gap-10 w-full">
        <Link to="/" className="text-3xl">
          Investments
        </Link>
        <div className="flex gap-5">
          <Link to="acoes">Ações</Link>
          <span>FII</span>
        </div>
        <div className="text-ds-orange-500 ml-auto flex gap-5">
          {patrimony ? (
            <>
              <span onClick={togglePatrimony} className="cursor-pointer">
                {showPatrimony ? (
                  <span className="flex gap-2">
                    <EyeOff />
                    {currencyFormatter.format(patrimony)}
                  </span>
                ) : (
                  <span className="flex gap-2">
                    <Eye></Eye>
                    R$...
                  </span>
                )}
              </span>
            </>
          ) : (
            <LoaderCircle className="animate-spin" strokeWidth={3} />
          )}
          <span>{name}</span>
          <a onClick={handleLogout}>
            <Power />
          </a>
        </div>
      </div>
    </header>
  )
}
