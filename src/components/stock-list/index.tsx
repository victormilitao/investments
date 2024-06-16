import { UserStock } from '@/interfaces/stock.interface'
import { Stock } from '../stock'

interface StockListProps {
  userStocks: UserStock[]
}

export function StockList(props: StockListProps) {
  const totalBalance = props.userStocks.reduce(
    (acc, userStock) => (acc += +userStock.balance),
    0
  )

  return (
    <div className="m-auto max-w-3/4 grid grid-cols-[repeat(auto-fit,minmax(200px,_1fr))] gap-6">
      {props.userStocks
        .slice()
        .sort((a, b) => b.balance - a.balance)
        .map((userStock) => (
          <Stock
            key={userStock.stock.id}
            icon={userStock.stock.icon}
            name={userStock.stock.ticker_symbol}
            ticker_symbol={userStock.stock.ticker_symbol}
            balance={userStock.balance}
            percent={userStock.balance / totalBalance}
          ></Stock>
        ))}
    </div>
  )
}
