import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Default } from './layouts/default'
import { Stocks } from './pages/stocks'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/acoes" element={<Stocks />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  )
}
