import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInFormSchema = z.object({
  email: z.string().email({message: 'Email inválido'}),
  password: z.string().min(8).max(16)
})

type SignInFormData = z.infer<typeof signInFormSchema>

export default function SignIn() {
  const { 
          register, 
          handleSubmit, 
          formState:{ errors } 
        } = useForm<SignInFormData>({
          resolver: zodResolver(signInFormSchema)
        })

  function handleSignIn(data: SignInFormData){
    console.log(data)
  }

  return (
    <div className="w-screen h-screen bg-gray_100 flex flex-col items-center justify-center">
      <form className="w-80 flex flex-col items-center justify-center" onSubmit={handleSubmit(handleSignIn)}>
        <h1 className="text-3xl text-white font-bold mb-8">Entre com a sua conta</h1>
        
        <label className="w-80 text-lg text-white mb-2">Email</label>
        <input 
          type="text" 
          className="w-80 h-12 rounded-lg outline-none px-2 mb-4"
          {...register('email')} 
        />
        {errors.email && <span>{errors.email.message}</span> }
        
        <label className="w-80 text-lg text-white mb-2">Senha</label>
        <input 
          type="password" 
          className="w-80 h-12 rounded-lg outline-none px-2 mb-4"
          {...register('password')}
        />
        
        <button 
          type="submit"
          className="w-80 h-12 bg-green_100 text-white rounded-lg cursor-pointer mt-4"
        >
          Entrar 
        </button>
      </form>
      <Link href='/' className='text-white text-xl mt-4 hover:text-green_500'>Não possui uma conta? clique aqui!</Link>
    </div>
  );
}
