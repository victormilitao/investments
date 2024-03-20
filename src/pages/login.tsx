import { useNavigate } from 'react-router-dom'
import { Button } from '../components/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

const loginValidation = zod.object({
  email: zod.string().min(1, 'Informe um email válido'),
  password: zod
    .string()
    .min(8, 'O password deve conter no minimo 8 caracteres'),
})

type LoginData = zod.infer<typeof loginValidation>

export function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState } = useForm<LoginData>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const email = watch('email')
  const password = watch('password')
  const isLoginDisabled = !email || !password
  console.dir(formState.errors)

  function handleLogin(data: any): void {
    console.dir(data)
    navigate('/')
  }

  return (
    <div
      onSubmit={handleSubmit(handleLogin)}
      className="flex items-center justify-center h-screen"
    >
      <div className="flex flex-col items-center justify-center gap-16 w-1/3 h-[650px] rounded-[10px] bg-ds-black-500 shadow-[0_0_30px_5px] shadow-ds-black-400">
        <p className="text-[36px]">Investments</p>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Email" {...register('email')}></input>
          <input
            type="password"
            placeholder="Senha"
            {...register('password')}
          ></input>
          <Button className="mt-4" disabled={isLoginDisabled && false}>
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
