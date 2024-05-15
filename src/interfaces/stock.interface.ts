export interface UserStock {
  id: string
  balance: number
  stock: Stock
}

export interface Stock {
  id: string
  icon: number
  ticker_symbol: string
  stock_type: number
}
