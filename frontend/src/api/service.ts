import axios, {
 AxiosError,
 AxiosResponse,
 type AxiosInstance,
 type AxiosRequestConfig,
} from 'axios'
import { get } from 'lodash-es'
import router from '../router'
import { getToken as getCookieToken } from '../utils/cookies'

const axiosConfig = {
 baseURL: import.meta.env.VITE_BASE_API,
 timeout: 5000,
}

function createHeaders(config: AxiosRequestConfig) {
 return {
  'Authorization': 'Bearer ' + getCookieToken(),
  'Content-Type': get(config, 'headers.Content-Type', 'application/json'),
 }
}

const errorMessages: Record<number, string> = {
 400: 'Bad Request please check your request',
 401: 'Redirect to login page',
 403: 'access denied',
 404: 'Error in request address',
 408: 'Request timed out',
 422: 'Validation Server, Error in Request',
 500: 'Internal server error',
 501: 'service not implemented',
 502: 'Gateway error',
 503: 'service is not available',
 504: 'Gateway timed out',
 505: 'HTTP Version not supported',
}

function handleErrorResponse(error: AxiosError) {
 const status = error?.response?.status
 error.message = errorMessages[status!] || ''

 if (status === 401) {
  handleUnauthorizedError()
 }

 return Promise.reject(error)
}

function handleUnauthorizedError() {
 router.push('/login')
}

function createService() {
 const service = axios.create(axiosConfig)
 service.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
 )
 service.interceptors.response.use((response) => {
  return response
 }, handleErrorResponse)
 return service
}

function createRequestFunction(service: AxiosInstance) {
 return function (config: AxiosRequestConfig): Promise<AxiosResponse> {
  const configDefault = {
   headers: createHeaders(axiosConfig),
   ...axiosConfig,
   data: {},
  }
  return service({ ...configDefault, ...config })
 }
}

export const service = createService()
export const request = createRequestFunction(service)
export const multipart = createRequestFunction(service)
export const pdf = createRequestFunction(service)
