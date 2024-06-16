export interface UserStock {
  id: string
  balance: number
  stock: Stock
}

export interface Stock {
  id: string
  icon: string
  ticker_symbol: string
  stock_type: number
}
