import { useNavigate } from 'react-router-dom'
import { Button } from '../components/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

const loginValidation = zod.object({
  name: zod.string().min(1, 'Informe um nome'),
  email: zod.string().min(1, 'Informe um email'),
  password: zod.string().min(8, 'Informe um password válido'),
})

type SignupData = zod.infer<typeof loginValidation>

export function Signup() {
  const navigate = useNavigate()
  const { register, handleSubmit, watch } = useForm<SignupData>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const name = watch('name')
  const email = watch('email')
  const password = watch('password')
  const isSignupDisabled = !name || !email || !password

  function handleSignup(data: any): void {
    console.dir(data)
    navigate('/login')
  }

  return (
    <div
      onSubmit={handleSubmit(handleSignup)}
      className="flex items-center justify-center h-screen"
    >
      <div className="flex flex-col items-center justify-center gap-16 w-1/3 h-[650px] rounded-[10px] bg-ds-black-500 shadow-[0_0_30px_5px] shadow-ds-black-400">
        <p className="text-[36px]">Investments</p>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Nome" {...register('name')}></input>
          <input type="text" placeholder="Email" {...register('email')}></input>
          <input
            type="password"
            placeholder="Senha"
            {...register('password')}
          ></input>
          <Button className="mt-4" disabled={isSignupDisabled}>
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  )
}
