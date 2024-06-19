import { UserStocksContext } from '@/contexts/UserStocksContext'
import { useContext, useEffect, useState } from 'react'
import { LoaderCircle, Upload } from 'lucide-react'
import api from '@/lib/api'
import { toastError, toastSuccess } from '@/lib/toast'
import { PatrimonyContext } from '@/contexts/PatrimonyContext'
import { MainContent } from '@/components/main-content'
import { SideMenu } from '@/components/side-menu'
import { SideMenuTitle } from '@/components/side-menu/components/side-menu-title'
import { StockList } from '@/components/stock-list'

export function Stocks() {
  const { userStocks, fetchStocks } = useContext(UserStocksContext)
  const { getPatrimony } = useContext(PatrimonyContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchStocks()
  }, [])

  const handleFile = async (event: any): Promise<void> => {
    const file: File = event?.target?.files[0]
    if (!file) return

    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('document', file, file.name)
      const response = await api.post('/v1/users/position_import', formData)
      if (response?.data?.success) {
        toastSuccess("Planilha importada com sucesso!")
        getPatrimony()
      }
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
        <p className="text-xl text-center mb-5">Ações</p>
        <StockList userStocks={userStocks}></StockList>
      </MainContent>
    </>
  )
}
