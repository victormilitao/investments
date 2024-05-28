import { UserStocksContext } from '@/contexts/UserStocksContext'
import { currencyFormatter, percentFormatter } from '@/lib/formatter'
import { StocksTable } from './styles'
import { useContext, useEffect, useState } from 'react'
import { LoaderCircle, Upload } from 'lucide-react'
import api from '@/lib/api'
import { toastError } from '@/lib/toast'
import { PatrimonyContext } from '@/contexts/PatrimonyContext'
import { MainContent } from '@/components/main-content'
import { SideMenu } from '@/components/side-menu'
import { SideMenuTitle } from '@/components/side-menu/components/side-menu-title'

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
    <>
      <SideMenu>
        <SideMenuTitle title="B3" />
        <label htmlFor="file" className="cursor-pointer flex gap-x-2">
          {isLoading && <LoaderCircle className="animate-spin" />}
          {!isLoading && <Upload />}
          Importar planilha da B3
          <input name="file" id="file" type="file" onChange={handleFile} />
        </label>
      </SideMenu>
      <MainContent>
        <p className="text-xl text-left">Ações</p>

        <div className="w-full min-w-[500px]">
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
                      {percentFormatter.format(
                        userStock.balance / totalBalance
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </StocksTable>
        </div>
      </MainContent>
    </>
  )
}
