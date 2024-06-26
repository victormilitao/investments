import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/button/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import api from '@/lib/api'
import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '@/contexts/SessionContext'
import { toastError } from '@/lib/toast'
import { Error } from '@/components/error'

const loginValidation = zod.object({
  email: zod.string().email('Informe um email válido'),
  password: zod
    .string()
    .min(6, 'O password deve conter no mínimo 6 caracteres'),
})

type LoginData = zod.infer<typeof loginValidation>

export function Login() {
  const navigate = useNavigate()
  const {user} = useParams()
  const { session, setSession } = useContext(SessionContext)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState, setValue } = useForm<LoginData>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (session) navigate('/')
    if (user) setValue('email', user)
  }, [session])

  if (session) return null

  async function handleLogin(data: LoginData): Promise<void> {
    setIsLoading(true)

    try {
      const response = await api.post('/v1/user/sign_in', {
        user: {
          email: data.email,
          password: data.password,
        },
      })
      setSession(response.data)
      navigate('/')
    } catch (error: any) {
      toastError(
        'Ocorreu um erro ao fazer o login.',
        error?.response?.data?.errors[0]
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-16 w-3/4 max-w-[500px] min-w-96 h-3/4 min-h-[400px] max-h-[650px] rounded-[10px] bg-ds-black-500 shadow-[0_0_30px_5px] shadow-ds-black-400">
        <p className="text-[36px]">Investments</p>
        <div className="w-1/2">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-4 "
          >
            <input
              type="text"
              placeholder="Email"
              autoComplete={user ? 'new-email' : ''}
              value={user}
              {...register('email')}
            ></input>
            <Error message={formState?.errors?.email?.message} />
            <input
              type="password"
              placeholder="Senha"
              {...register('password')}
            ></input>
            <Error message={formState?.errors?.password?.message} />
            <Button className="mt-4" loading={isLoading}>
              Login
            </Button>
            <Link to="/signup" className='text-center text-design-variant underline'>Crie uma conta</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
