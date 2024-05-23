import { UserStocksContext } from '@/contexts/UserStocksContext'
import { currencyFormatter, percentFormatter } from '@/lib/formatter'
import { StocksTable } from './styles'
import { useContext, useEffect, useState } from 'react'
import { LoaderCircle, Upload } from 'lucide-react'
import api from '@/lib/api'
import { toastError } from '@/lib/toast'
import { PatrimonyContext } from '@/contexts/PatrimonyContext'

export function Stocks() {
  const { userStocks, fetchStocks } = useContext(UserStocksContext)
  const { getPatrimony } = useContext(PatrimonyContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchStocks()
  }, [])

  const totalBalance = userStocks.reduce(
    (acc, userStock) => (acc += +userStock.balance),
    0
  )

  const handleFile = async (event: any): Promise<void> => {
    const file: File = event?.target?.files[0]
    if (!file) return

    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('document', file, file.name)
      const response = await api.post('/v1/users/position_import', formData)
      if (response?.data?.success) getPatrimony()
    } catch (error: any) {
      toastError(
        'Ocorreu um erro ao importar a planilha.',
        error?.response?.data?.errors?.[0]
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <p className="text-xl">Ações</p>
      <label htmlFor="file" className="cursor-pointer flex gap-x-2">
        {isLoading && <LoaderCircle className="animate-spin" />}
        {!isLoading && <Upload />}
        Importar planilha da B3
      </label>
      <input
        name="file"
        id="file"
        type="file"
        onChange={handleFile}
        className="relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
      />
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
