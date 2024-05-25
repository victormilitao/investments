import { getSession } from "@/contexts/SessionContext"
import axios from "axios"

const api = axios.create({
  baseURL: "https://investment-api-4fni.onrender.com/api",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { data, status } = error?.response
    if (
      status === 401 &&
      ["Token expirado", "Token inválido"].includes(data?.errors?.at(0))
    ) {
      console.error("Token expirado ou inválido")
    }

    if (error.request) {
      console.error("Nenhuma resposta recebida da API", error.request)
    }

    return Promise.reject(error)
  }
)

api.interceptors.request.use(
  (config) => {
    const token = getSession()?.user?.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default api
