import { ReactNode, createContext, useEffect, useState } from "react";
import Router from 'next/router'

import { destroyCookie, parseCookies, setCookie } from "nookies";
import { api } from "@/pages/services/api-client";
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

type SignUpProps = {
  name: string
  email: string
  password: string
}

type AuthContextData = {
  isAuthenticated: boolean
  user: User
  signIn: (credentials: SignInProps) => Promise<void>
  signUp: (credentials: SignUpProps) => Promise<void>
  signOut: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try{
    destroyCookie(undefined, '@auth-system-jwt:token')
    Router.push('/')
  }catch(err){
    toast.error('Erro ao deslogar')
  }
}

export function AuthProvider({ children } : AuthProviderProps){
  const [user, setUser] = useState<User>({} as User)
  const isAuthenticated = !!user

  useEffect(() => {
    const { '@auth-system-jwt:token': token } = parseCookies()

    if(token){
      api
        .get('/me')
        .then((response) => {
          const { id, name, email } = response.data

          setUser({
            id,
            name,
            email
          })
        }).catch(() => {
          signOut()
        })
    }
  }, )

  async function signIn({ email, password } : SignInProps){
    try{
      const response = await api.post('/users', {
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

  async function signUp({ name, email, password}  :SignUpProps){
    try{
      const response = await api.post('/sessions', {
        name,
        email,
        password
      })

      if(response.status === 201){
        toast.success('Conta criada com sucesso')
      }
      Router.push('/home')
    }catch(err){
      toast.error("Erro ao cadastrar usuário")
    }
  }
  return(
    <AuthContext.Provider value={{
                                  isAuthenticated, 
                                  user, 
                                  signIn, 
                                  signUp, 
                                  signOut
                                  }}>
          {children}
    </AuthContext.Provider>
  )
}