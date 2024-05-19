import { useNavigate } from "react-router-dom"
import { Button } from "../components/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from "zod"
import { api } from "@/lib/api"
import { useContext, useEffect, useState } from "react"
import { SessionContext } from "@/contexts/SessionContext"
import { toastError } from "@/lib/toast"

const loginValidation = zod.object({
  email: zod.string().email("Informe um email válido"),
  password: zod
    .string()
    .min(6, "O password deve conter no mínimo 6 caracteres"),
})

type LoginData = zod.infer<typeof loginValidation>

export function Login() {
  const navigate = useNavigate()
  const { session, setSession } = useContext(SessionContext)
  const [isLoginDisabled, setIsLoginDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, watch, formState } = useForm<LoginData>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const email = watch("email")
  const password = watch("password")

  useEffect(() => {
    if (session) navigate("/")
    setIsLoginDisabled(!email || !password)
  }, [email, password, session])

  if (session) return null

  async function handleLogin(data: LoginData) {
    setIsLoading(true)

    try {
      const response = await api.post("/v1/user/sign_in", {
        user: {
          email: data.email,
          password: data.password,
        },
      })
      setSession(response.data)
      navigate("/")
    } catch (error: any) {
      toastError(
        "Ocorreu um erro ao fazer o login.",
        error?.response?.data?.errors[0]
      )
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-16 w-1/3 h-[650px] rounded-[10px] bg-ds-black-500 shadow-[0_0_30px_5px] shadow-ds-black-400">
        <p className="text-[36px]">Investments</p>
        <div className="w-1/2">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-4 "
          >
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
            ></input>
            {formState.errors.email && (
              <p role="alert">{formState.errors.email.message}</p>
            )}
            <input
              type="password"
              placeholder="Senha"
              {...register("password")}
            ></input>
            {formState.errors.password && (
              <p role="alert">{formState.errors.password.message}</p>
            )}
            <Button
              className="mt-4"
              disabled={isLoginDisabled}
              loading={isLoading}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
