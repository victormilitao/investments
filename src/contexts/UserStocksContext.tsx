import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '@/lib/api'
import { UserStock } from '@/interfaces/stock.interface'

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

  useEffect(() => {
    async function fetchStocks(): Promise<void> {
      try {
        const response = await api.get('/v1/users/stocks')
        console.dir(response.data)
        setUserStocks(response.data.user_stocks)
      } catch (error) {
        console.error('Error fetching stocks:', error)
      }
    }

    fetchStocks()
    console.dir(userStocks)
  }, [])

  return (
    <UserStocksContext.Provider value={{ userStocks }}>
      {children}
    </UserStocksContext.Provider>
  )
}
