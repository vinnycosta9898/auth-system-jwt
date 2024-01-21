import Link from "next/link";

export default function SignIn() {
  return (
    <div className='w-screen h-screen bg-gray_100 flex flex-col items-center justify-center'>
        <form className='flex flex-col items-center'>
          <h1 className=" text-white text-3xl font-bold">Entre com a sua conta</h1>
          <input 
            type="text" 
            className='w-80 h-12 rounded-lg outline-none px-2 mt-4'
            placeholder='email'  
          />
          <input 
            type="password" 
            className='w-80 h-12 rounded-lg outline-none px-2 mt-4'
            placeholder="senha"
          />

          <button className="w-80 h-12 rounded-lg outline-none bg-green text-white font-bold mt-8">
            Entrar
          </button>
        </form>

        <Link href='/' className='text-white mt-2'>Não possui uma conta? clique aqui!</Link>
    </div>
  );
}
