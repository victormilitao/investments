import { StockList } from "@/components/stock-list";
import { UserStocksContext } from "@/contexts/UserStocksContext";
import { useContext, useEffect } from "react";

export function StockIndex() {
  const { userStocks, fetchStocks } = useContext(UserStocksContext)

  useEffect(() => {
    fetchStocks()
  }, [])

  return (
    <>
      <p className='text-xl text-center font-bold mb-5'>Ações</p>
      <div className='max-w-[80%] 2xl:max-w-[70%] mx-auto'>
        <StockList userStocks={userStocks}></StockList>
      </div>
    </>
  )
}
