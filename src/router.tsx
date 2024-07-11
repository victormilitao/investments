import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Default } from './layouts/default'
import { Stocks } from './pages/stocks'
import { Public } from './layouts/public'
import { Signup } from './pages/signup'
import { StockIndex } from './pages/stocks/stock-index'
import { IRRF } from './pages/stocks/irrf'

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<Default />}>
        <Route path='/' element={<Home />}></Route>
        <Route path='/acoes' element={<Stocks />}>
          <Route index element={<StockIndex />} />
          <Route path='irrf' element={<IRRF />} />
        </Route>
      </Route>
      <Route path='/' element={<Public />}>
        <Route path='/login/:user?' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Route>
    </Routes>
  )
}
