import { useNavigate } from 'react-router-dom'
import { Button } from '../components/button/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import { useState } from 'react'

const signupValidation = zod.object({
  name: zod.string().min(1, 'Informe um nome'),
  email: zod.string().email('Informe um email válido'),
  password: zod
    .string()
    .min(6, 'O password deve conter no mínimo 6 caracteres'),
})

type SignupData = zod.infer<typeof signupValidation>

export function Signup() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit } = useForm<SignupData>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  function handleSignup(data: any): void {
    setIsLoading(true)
    try {
      console.dir(data)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-16 w-1/3 h-[650px] rounded-[10px] bg-ds-black-500 shadow-[0_0_30px_5px] shadow-ds-black-400">
        <p className="text-[36px]">Investments</p>
        <form
          className="w-1/2 flex flex-col gap-4"
          onSubmit={handleSubmit(handleSignup)}
        >
          <input type="text" placeholder="Nome" {...register('name')}></input>
          <input type="text" placeholder="Email" {...register('email')}></input>
          <input
            type="password"
            placeholder="Senha"
            {...register('password')}
          ></input>
          <Button className="mt-4" loading={isLoading}>
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  )
}
