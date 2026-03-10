import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

interface HttpConfig {
  baseURL: string
  defaultHeaders: Record<string, string>
}

interface HttpResponse<T> {
  data: T | null
  status: number
}

interface HttpClient {
  fetchData: <T>(config: AxiosRequestConfig) => Promise<T | null>
  isSuccess: (config: AxiosRequestConfig) => Promise<boolean>
  fetchFull: <T>(config: AxiosRequestConfig) => Promise<HttpResponse<T>>
}

const httpClient = ({ baseURL, defaultHeaders }: HttpConfig): HttpClient => {
  const DATA_NULL = null
  const ERROR_STATUS = 500

  const axiosInstance = axios.create({
    baseURL,
    headers: defaultHeaders,
  })

  const request = async <T>(config: AxiosRequestConfig): Promise<HttpResponse<T>> => {
    const headers = { ...config.headers }
    try {
      const { data, status } = await axiosInstance.request<T>(config)

      return { data, status }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return {
          data: err.response?.data ?? DATA_NULL,
          status: err.response?.status ?? ERROR_STATUS,
        }
      }

      return { data: DATA_NULL, status: ERROR_STATUS }
    }
  }

  const fetchData = async <T>(config: AxiosRequestConfig): Promise<T | null> => {
    const { data } = await request<T>(config)

    return data
  }

  const isSuccess = async (config: AxiosRequestConfig): Promise<boolean> => {
    const { status } = await request(config)

    return status >= 200 && status < 300
  }

  const fetchFull = async <T>(config: AxiosRequestConfig): Promise<HttpResponse<T>> =>
    await request<T>(config)

  return { fetchData, isSuccess, fetchFull }
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
