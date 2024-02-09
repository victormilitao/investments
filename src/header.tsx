import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="min-h-[100px] bg-ds-black-500 px-10 flex items-center">
      <div className="flex items-baseline gap-10 w-full">
        <Link to="/" className="text-3xl">
          Investments
        </Link>
        <div className="flex gap-5">
          <Link to="/acoes">Ações</Link>
          <span>FII</span>
        </div>
        <div className="text-ds-orange-500 ml-auto">
          <span>Victor</span>
        </div>
      </div>
    </header>
  )
}
