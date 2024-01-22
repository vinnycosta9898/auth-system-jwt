import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const formSignUpSchema = z.object({
  name: z
        .string()
        .min(3, {message: 'O nome precisa ter no minímo 3 caractheres'}),
  email: z
         .string()
         .email({message: 'Email inválido'}),
  password: 
          z.string()
          .min(8, {message: 'A senha precisa ter no minímos 8 digítos'})
          .max(16, {message: 'A senha recisa ter no máximo 16 digítos'})
          .refine((password) => {
            const letters_uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
            const letter_lowercase = letters_uppercase.map((letter) => letter.toLowerCase())
            const symbols = '!@#$%&*()'.split('')

            for (let i=0; i< letters_uppercase.length; i++){
              if(password.includes(letters_uppercase[i] && letter_lowercase[i] && symbols[i])){
                return true
              }
            }
            
          },{
            message: 'A senha precisa ter no minimo 1 letra maíscula 1 minúscula e 1 símbolo'
          }),          
  password_confirmation: 
          z.string()
          .refine((data: any) => data.password === data.password_confirmation, {
            message: 'As senhas não se coincidem'
          })
})

 type FormSignUpData = z.infer<typeof formSignUpSchema>

export default function Home() {
  const {
      register,
      handleSubmit,
      formState: { errors}
   } = useForm<FormSignUpData>({
    resolver: zodResolver(formSignUpSchema)
   })

  function handleSignUp(data: FormSignUpData){
    console.log(data)
  }

  return (
    <div className="w-screen h-screen bg-gray_100 flex flex-col items-center justify-center">
      <form className="w-80 flex flex-col items-center justify-center" onSubmit={handleSubmit(handleSignUp)}>
        <h1 className="text-3xl text-white font-bold mb-8">Crie a sua conta</h1>
        
        <label className="w-80 text-lg text-white mb-2">Nome</label>
        <input 
          type="text" 
          className="w-80 h-12 rounded-lg outline-none px-2 mb-4"
          {...register('name')}
        />
        {errors.name && <span className="text-red">{errors.name.message}</span> }
        
        <label className="w-80 text-lg text-white mb-2">Email</label>
        <input 
          type="text" 
          className="w-80 h-12 rounded-lg outline-none px-2 mb-4" 
          {...register('email')}
        />
        {errors.email && <span className="text-red">{errors.email.message}</span> }

        <label className="w-80 text-lg text-white mb-2">Senha</label>
        <input 
          type="password" 
          className="w-80 h-12 rounded-lg outline-none px-2 mb-4" 
          {...register('password')}
        />
        {errors.password && <span className="text-red">{errors.password.message}</span> }

        
        <label className="w-80 text-lg text-white mb-2">Confirme a sua senha</label>
        <input 
          type="password" 
          className="w-80 h-12 rounded-lg outline-none px-2 mb-4" 
          {...register('password_confirmation')}
        />
        {errors.password_confirmation && <span className="text-red text-center">{errors.password_confirmation.message}</span> }


        <button 
          type="submit" 
          className="w-80 h-12 bg-green_100 text-white rounded-lg cursor-pointer mt-4"
        >
          Crie a sua conta
        </button>
      </form>
      <Link 
        href='/sign-in' 
        className='text-white text-xl mt-4 hover:text-green_500'>
          Já possui uma conta? clique aqui!
      </Link>
    </div>
  );
}
