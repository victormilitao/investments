import { Link } from 'react-router-dom'
import { Power } from 'lucide-react';

export function Header() {
  return (
    <header className="min-h-[100px] bg-ds-black-400 px-10 flex items-center border-b-2 border-solid border-ds-black-300">
      <div className="flex items-baseline gap-10 w-full">
        <Link to="/" className="text-3xl">
          Investments
        </Link>
        <div className="flex gap-5">
          <Link to="acoes">Ações</Link>
          <span>FII</span>
        </div>
        <div className="text-ds-orange-500 ml-auto flex gap-5">
          <span>Victor</span>
          <Link to='login'><Power /></Link>
        </div>
      </div>
    </header>
  )
}
