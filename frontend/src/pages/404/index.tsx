import Link from "next/link"

export default function NotFound(){
  return(
    <div className="w-creen h-screen bg-gray_100 flex flex-col items-center justify-center">
      <h1 className='text-4xl text-white my-4'>404 Página não encontrada</h1>
      <Link href='/home' className='text-2xl text-white'><span className='text-green_500 text-underline'>Clique aqui </span>para voltar ao Inicio</Link>
    </div>
  )
}