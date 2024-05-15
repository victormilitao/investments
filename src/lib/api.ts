import axios from "axios"

export const api = axios.create({
  baseURL: "https://investment-api-4fni.onrender.com/api",
  headers: { "X-Custom-Header": "foobar" },
})
