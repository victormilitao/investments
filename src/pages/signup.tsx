import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/button/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import { useState } from 'react'
import api from '@/lib/api'
import { toastError, toastSuccess } from '@/lib/toast'
import HTTP_STATUS from '@/constants/http'
import { Error } from '@/components/error'

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
  const { register, handleSubmit, formState } = useForm<SignupData>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  async function handleSignup(data: SignupData): Promise<void> {
    setIsLoading(true)
    try {
      const response = await api.post('/v1/user', {
        user: data,
      })
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Conta criada!")
        navigate('/login/' + response?.data?.user?.email)
      }
    } catch (error: any) {
      toastError(
        'Ocorreu um erro ao criar conta.',
        error?.response?.data?.errors[0]
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-16 w-3/4 max-w-[500px] min-w-96 h-3/4 min-h-[420px] max-h-[650px] rounded-[10px] bg-ds-black-500 shadow-[0_0_30px_5px] shadow-ds-black-400">
        <p className="text-[36px]">Investments</p>
        <form
          className="w-1/2 min-w-64 flex flex-col gap-4"
          onSubmit={handleSubmit(handleSignup)}
        >
          <input type="text" placeholder="Nome" {...register('name')}></input>
          <Error message={formState?.errors?.name?.message} />
          <input
            type="text"
            placeholder="Email"
            autoComplete="new-email"
            {...register('email')}
          ></input>
          <Error message={formState?.errors?.email?.message} />
          <input
            type="password"
            placeholder="Senha"
            autoComplete="new-password"
            {...register('password')}
          ></input>
          <Error message={formState?.errors?.password?.message} />
          <Button className="mt-4" loading={isLoading}>
            Criar conta
          </Button>
          <Link to="/login" className='text-center text-design-variant underline'>Login</Link>
        </form>
      </div>
    </div>
  )
}
