import Link from "next/link";

export default function SignIn() {
  return (
    <div className="w-screen h-screen bg-gray_100 flex flex-col items-center justify-center">
      <form className="w-80 flex flex-col items-center justify-center">
        <h1 className="text-3xl text-white font-bold mb-8">Entre com a sua conta</h1>
        
        <label className="w-80 text-lg text-white mb-2">Email</label>
        <input type="text" className="w-80 h-12 rounded-lg outline-none px-2 mb-4" />
        
        <label className="w-80 text-lg text-white mb-2">Senha</label>
        <input type="password" className="w-80 h-12 rounded-lg outline-none px-2 mb-4" />
        
        <button className="w-80 h-12 bg-green_100 text-white rounded-lg cursor-pointer mt-4">
          Entrar 
        </button>
      </form>
      <Link href='/' className='text-white text-xl mt-4 hover:text-green_500'>Não possui uma conta? clique aqui!</Link>
    </div>
  );
}
