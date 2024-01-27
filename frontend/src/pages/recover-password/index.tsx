import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const recoverPasswordSchema = z.object({
  emailRecovery: 
                  z.string()
                  .email({message: 'E-mail de recuperação inválido'})
})

type RecoverPasswordData = z.infer<typeof recoverPasswordSchema>

export default function RecoverPassword(){
  const { 
          register, 
          handleSubmit, 
          formState: { errors }
        } = useForm<RecoverPasswordData>({
          resolver: zodResolver(recoverPasswordSchema)
        })

  async function handleRecoverPassword(emailRecovery: RecoverPasswordData){
    console.log(emailRecovery)
  }
  
  return(
    <div className="min-w-screen min-h-screen bg-gray_100 flex flex-col items-center justify-center gap-4 ">
      <h1 className="text-white text-3xl font-bold">Recupere a sua senha</h1>
      <form 
        className="flex flex-col items-center justify-center gap-4"
        onSubmit={handleSubmit(handleRecoverPassword)}
      >
        <input 
          type="text"    
          className="w-80 h-12 rounded-lg outline-none px-2 mb-4"
          placeholder="Digite um email para recuperar senha"
          {...register('emailRecovery')}
        />
        {errors.emailRecovery && <span className="text-red">{errors.emailRecovery.message}</span>}
        <button 
          className="w-80 h-12 bg-green_100 text-white font-bold rounded-lg"
          type="submit"
        >
          Enviar E-mail
        </button>
      </form>
    </div>
  )
}