import { UserStock } from '@/interfaces/stock.interface'
import { Stock } from '../stock'
import { Skeleton } from '../ui/skeleton'

interface StockListProps {
  userStocks: UserStock[] | null
}

export function StockList(props: StockListProps) {
  const totalBalance =
    props?.userStocks?.reduce(
      (acc, userStock) => (acc += +userStock.balance),
      0
    ) || 0

  return (
    <div className="m-auto max-w-3/4 grid grid-cols-[repeat(auto-fit,minmax(200px,_1fr))] gap-6">
      {!props.userStocks && (
        <div className="mx-auto grid grid-cols-2 gap-4 max-w-[600px]">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 min-w-12 rounded-full" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
      )}

      {props.userStocks &&
        props.userStocks
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
