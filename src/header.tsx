import { Link } from "react-router-dom"
import { Power } from "lucide-react"
import { useSession } from "./contexts/SessionContext"

export function Header() {
  const { session, setSession } = useSession()
  const name = session?.user?.name

  function handleLogout(): void {
    localStorage.removeItem("session")
    setSession(null)
  }

  return (
    <header className="min-h-[100px] bg-ds-black-500 px-10 flex items-center">
      <div className="flex items-baseline gap-10 w-full">
        <Link to="/" className="text-3xl">
          Investments
        </Link>
        <div className="flex gap-5">
          <Link to="acoes">Ações</Link>
          <span>FII</span>
        </div>
        <div className="text-ds-orange-500 ml-auto flex gap-5">
          <span>{name}</span>
          <a onClick={handleLogout}>
            <Power />
          </a>
        </div>
      </div>
    </header>
  )
}
