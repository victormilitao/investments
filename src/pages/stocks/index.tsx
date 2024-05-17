import { UserStocksContext } from "@/contexts/UserStocksContext"
import { currencyFormatter, percentFormatter } from "@/lib/formatter"
import { StocksTable } from "./styles"
import { useContext, useEffect } from "react"

export function Stocks() {
  const { userStocks, fetchStocks } = useContext(UserStocksContext)

  useEffect(() => {
    fetchStocks()
  }, [])

  const totalBalance = userStocks.reduce(
    (acc, userStock) => (acc += +userStock.balance),
    0
  )

  return (
    <div>
      <p className="text-xl">Ações</p>
      <div className="w-full md:w-[600px]">
        <StocksTable>
          <thead>
            <tr>
              <th>Ação</th>
              <th>Valor</th>
              <th>Percentual</th>
            </tr>
          </thead>
          <tbody>
            {userStocks
              .slice()
              .sort((a, b) => b.balance - a.balance)
              .map((userStock) => (
                <tr key={userStock.id} className="hover:bg-ds-black-300">
                  <td>{userStock.stock.ticker_symbol}</td>
                  <td>{currencyFormatter.format(userStock.balance)}</td>
                  <td>
                    {percentFormatter.format(userStock.balance / totalBalance)}
                  </td>
                </tr>
              ))}
          </tbody>
        </StocksTable>
      </div>
    </div>
  )
}
