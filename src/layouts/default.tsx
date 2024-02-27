import { Outlet } from 'react-router-dom'
import { Header } from '../header'

export function Default() {
  return (
    <div>
      <Header />
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  )
}
