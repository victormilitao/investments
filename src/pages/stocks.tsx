import { api } from "@/lib/api"
import { useEffect } from "react"

export function Stocks() {

  async function getStocks(): Promise<void> {
    const response = await api.get("/v1/users/stocks")
    console.dir(response.data)
  }

  useEffect(() => {
    getStocks()
  })

  return <h1>Acoes</h1>
}