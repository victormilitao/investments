import axios from 'axios'

const api = axios.create({
  baseURL: 'https://investment-api-4fni.onrender.com/api',
  headers: { 'X-Custom-Header': 'foobar' },
})

const sessionStorage = JSON.parse(localStorage.getItem('session') || '')
const token = sessionStorage ? sessionStorage?.user?.token : null

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { api }