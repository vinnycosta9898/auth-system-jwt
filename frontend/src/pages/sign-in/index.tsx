import { useContext } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/context/AuthContext";

const signInFormSchema = z.object({
  email: z.string().email({message: 'Email inválido'}),
  password: z.string().min(8).max(16)
})

type SignInFormData = z.infer<typeof signInFormSchema>

export default function SignIn() {
  const { signIn } = useContext(AuthContext)
  const { 
          register, 
          handleSubmit, 
          formState:{ isSubmitting, errors } 
        } = useForm<SignInFormData>({
          resolver: zodResolver(signInFormSchema)
        })

  async function handleSignIn(data: SignInFormData){
    const { email, password } = data

    await signIn({
      email,
       password
    })
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-purple_100 via-purple-500 to-gray_100 flex flex-col items-center justify-center">
      <form className="w-[30rem] h-[40rem] flex flex-col items-center justify-center bg-transparent rounded-lg" onSubmit={handleSubmit(handleSignIn)}>
        <h1 className="text-3xl text-white font-bold mb-8">Entre com a sua conta</h1>
        
        <label className="w-80 text-lg text-white mb-2">Email</label>
        <input 
          type="text" 
          className="w-80 h-12 bg-transparent rounded-lg outline-none px-2 mb-4"
          {...register('email')} 
        />
        {errors.email && <span className="text-red text-center">{errors.email.message}</span> }
        
        <label className="w-80 text-lg text-white mb-2">Senha</label>
        <input 
          type="password" 
          className="w-80 h-12 bg-transparent rounded-lg outline-none px-2 mb-4"
          {...register('password')}
        />
        
        <button 
          type="submit"
          className="w-80 h-12 bg-green_100 font-bold text-white rounded-lg cursor-pointer mt-4"
          disabled={isSubmitting}
        >
          Entrar 
        </button>
      <Link href='/recover-password' className='text-white text-xl mt-4 hover:text-green_500'>Esqueceu a sua senha? Clique aqui!</Link>
      <Link href='/' className='text-white text-xl mt-4 hover:text-green_500'>Não possui uma conta? clique aqui!</Link>
      </form>
    </div>
  );
}
