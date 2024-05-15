import { Toaster } from "./components/ui/toaster"
import { SessionProvider } from "./contexts/SessionContext"
import { Router } from "./router"
import { BrowserRouter } from "react-router-dom"

export function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Router />
      </SessionProvider>
      <Toaster />
    </BrowserRouter>
  )
}
