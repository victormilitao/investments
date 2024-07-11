import api from '@/lib/api'
import { currencyFormatter, percentFormatter } from '@/lib/formatter'

interface StockProps {
  name: string
  ticker_symbol: string
  balance: number
  percent: number
  icon: string
}

export function Stock(props: StockProps) {
  const imgSrc = api.defaults.baseURL?.replace('/api', '') + props.icon

  return (
    <div className='flex justify-center'>
      <div className='min-w-[200px] max-w-[200px] flex'>
        <img className='rounded-full w-10 mr-3' src={imgSrc}></img>
        <div className='flex flex-col'>
          <span className='text-sm font-bold'>{props.name}</span>
          <span className='text-xs font-normal'>{props.ticker_symbol}</span>
        </div>
        <div className='flex flex-col ml-auto'>
          <span className='text-sm font-bold text-right'>
            {currencyFormatter.format(props.balance)}
          </span>
          <span className='text-xs font-normal text-right'>
            {percentFormatter.format(props.percent)}
          </span>
        </div>
      </div>
    </div>
  )
}
