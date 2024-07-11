import { StockList } from "@/components/stock-list"
import { UserStocksContext } from "@/contexts/UserStocksContext"
import { useContext, useEffect } from "react"

export function IRRF(){
  const { userStocks, fetchStocks } = useContext(UserStocksContext)

  useEffect(() => {
    fetchStocks()
  }, [])

  return (<>
    <p className='text-xl text-center font-bold mb-5'>IRRF</p>
    <div className='max-w-fit'>
      <StockList userStocks={userStocks}></StockList>
    </div>
  </>)
}