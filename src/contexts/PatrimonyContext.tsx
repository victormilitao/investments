import api from "@/lib/api"
import { toastError } from "@/lib/toast"
import { ReactNode, createContext, useState } from "react"

interface PatrimonyContextType {
  patrimony: number | undefined
  getPatrimony: () => void
}

export const PatrimonyContext = createContext<PatrimonyContextType>({
  patrimony: 0,
  getPatrimony: () => {},
})

export const PatrimonyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [patrimony, setPatrimony] = useState<number | undefined>()

  const getPatrimony = async () => {
    try {
      const response = await api.get("/v1/users/patrimony")
      setPatrimony(response.data.total)
    } catch (error) {
      console.error("Error fetching patrimony:", error)
      toastError("Ocorreu um erro ao buscar o valor do patrimônio.")
    }
  }

  return (
    <PatrimonyContext.Provider value={{ patrimony, getPatrimony }}>
      {children}
    </PatrimonyContext.Provider>
  )
}
