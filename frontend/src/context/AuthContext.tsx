import { ReactNode, createContext, useState } from "react";
import Router from 'next/router'

import { setCookie } from "nookies";
import { api } from "@/lib/axios";

import { toast } from "react-toastify";

type User = {
  id: string
  name: string
  email: string
}

type SignInProps = {
  email: string
  password: string
}

type AuthContextData = {
  isAuthenticated: boolean
  user: User
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children } : AuthProviderProps){
  const [user, setUser] = useState<User>({} as User)
  const isAuthenticated = !!user

  async function signIn({ email, password } : SignInProps){
    try{
      const response = await api.post('/sign-in', {
        email,
        password
      })

      const { id, name, token } = response.data

      setCookie(undefined, '@auth-system-jwt:token', token, {
        maxAge: 60 * 60 * 24, // 1 day
        path: '/'
      })
      
      setUser({
        id,
        name, 
        email
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      Router.push('/home')
    }catch(err){
      toast.error("Email ou senha inválidos")
    }
  }
  return(
    <AuthContext.Provider value={{isAuthenticated, user}}>

    </AuthContext.Provider>
  )
}