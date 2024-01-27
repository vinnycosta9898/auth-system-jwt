import { signOut } from "@/context/AuthContext"
import { parseCookies } from "nookies"
import { useEffect } from "react"

export default function Home(){
  useEffect(() => {
    const { '@auth-system-jwt:token' : token } = parseCookies()
    if(!token){
      signOut()
    }
  })

  return(
    <div className="w-screen h-screen bg-gray_100 flex flex-col items-center">
      <h1 className="text-3xl text-white font-bold mt-16">Seja Bem-vindo</h1>
      <button className="w-32 h-8 bg-red text-white rounded-lg mt-8" onClick={() => signOut()}>Fazer logout</button>
    </div>
  )
}
