import { createContext, ReactNode, useState } from "react"
import { api } from "@/lib/api"
import { UserStock } from "@/interfaces/stock.interface"
import { toastError } from "@/lib/toast"

interface UserStocksContextType {
  userStocks: UserStock[]
  fetchStocks: () => void
}

export const UserStocksContext = createContext<UserStocksContextType>({
  userStocks: [],
  fetchStocks: () => {},
})

export const UserStocksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userStocks, setUserStocks] = useState<UserStock[]>([])

  const fetchStocks = async () => {
    try {
      const response = await api.get("/v1/users/stocks")
      setUserStocks(response.data.user_stocks)
    } catch (error) {
      console.error("Error fetching stocks:", error)
      toastError("Ocorreu um erro ao buscar as ações.")
    }
  }

  return (
    <UserStocksContext.Provider value={{ userStocks, fetchStocks }}>
      {children}
    </UserStocksContext.Provider>
  )
}
