import api from '@/lib/api'
import { toastError } from '@/lib/toast'
import { ReactNode, createContext, useState } from 'react'

interface PatrimonyContextType {
  patrimony: number
  getPatrimony: () => void
  isLoading: boolean
}

export const PatrimonyContext = createContext<PatrimonyContextType>({
  patrimony: 0,
  getPatrimony: () => {},
  isLoading: false,
})

export const PatrimonyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [patrimony, setPatrimony] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getPatrimony = async () => {
    setIsLoading(true)
    try {
      const response = await api.get('/v1/users/patrimony')
      setPatrimony(response?.data?.total)
    } catch (error) {
      console.error('Error fetching patrimony:', error)
      toastError('Ocorreu um erro ao buscar o valor do patrimônio.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PatrimonyContext.Provider value={{ patrimony, getPatrimony, isLoading }}>
      {children}
    </PatrimonyContext.Provider>
  )
}
