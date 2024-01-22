import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { signOut } from '@/context/AuthContext'

export function setupAPIClient(ctx = undefined){
  const cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers:{
      Authorization: `Bearer ${cookies['@auth-system-jwt:token']}`
    },
  })

  api.interceptors.response.use((response) => {
    return response
  },
  (error: AxiosError) => {
    if(error.response ? error.response.status === 404 : null){
      if(typeof window !== undefined){
        signOut()
      }else{
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  })

  return api
}