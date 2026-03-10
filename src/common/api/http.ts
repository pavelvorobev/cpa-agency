import axios from 'axios'
import type { AxiosInstance } from 'axios'

interface HttpConfig {
  baseURL: string
  defaultHeaders: Record<string, string>
}

const httpClient = ({ baseURL, defaultHeaders }: HttpConfig): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL,
    headers: defaultHeaders,
  })

  return axiosInstance
}

const baseURL = import.meta.env.VITE_API_BASE_URL
const xApiKey = import.meta.env.VITE_X_API_KEY

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': xApiKey,
} as const

const http = httpClient({ baseURL, defaultHeaders })

export { http }
