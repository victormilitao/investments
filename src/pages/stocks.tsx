import { UserStocksProvider, useUserStocks } from '@/contexts/UserStocksContext'

export function Stocks() {
  const { userStocks } = useUserStocks()
  console.dir(userStocks)

  return (
    <UserStocksProvider>
      <div>
        <p className="text-lg">Ações</p>
        <ul>
          {userStocks.map((userStock) => (
            <li key={userStock.id}>{userStock.stock.ticker_symbol}</li>
          ))}
        </ul>
      </div>
    </UserStocksProvider>
  )
}
