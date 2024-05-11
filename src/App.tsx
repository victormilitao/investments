import { Toaster } from './components/ui/toaster'
import { Router } from './router'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <BrowserRouter>
      <Router />
      <Toaster />
    </BrowserRouter>
  )
}
