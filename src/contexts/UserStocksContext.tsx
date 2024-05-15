import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { api } from "@/lib/api"
import { UserStock } from "@/interfaces/stock.interface"
import { toastError } from "@/lib/toast"

interface UserStocksContextType {
  userStocks: UserStock[]
}

const UserStocksContext = createContext<UserStocksContextType>({
  userStocks: [],
})

export const useUserStocks = () => useContext(UserStocksContext)

export const UserStocksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userStocks, setUserStocks] = useState<UserStock[]>([])

  async function fetchStocks(): Promise<void> {
    try {
      const response = await api.get("/v1/users/stockss")
      setUserStocks(response.data.user_stocks)
    } catch (error) {
      console.error("Error fetching stocks:", error)
      toastError("Ocorreu um erro ao buscar as ações.")
    }
  }

  useEffect(() => {
    fetchStocks()
  }, [])

  return (
    <UserStocksContext.Provider value={{ userStocks }}>
      {children}
    </UserStocksContext.Provider>
  )
}
