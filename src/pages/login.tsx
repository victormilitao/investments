import { useNavigate } from "react-router-dom"
import { Button } from "../components/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from "zod"
import { useToast } from "../../src/components/ui/use-toast"
import { api } from "@/lib/api"
import { useEffect, useState } from "react"
import { useSession } from "@/contexts/SessionContext"
import { Session } from "@/interfaces/session"

const loginValidation = zod.object({
  email: zod.string().min(3, "Informe um email válido"),
  password: zod
    .string()
    .min(6, "O password deve conter no mínimo 6 caracteres"),
})

type LoginData = zod.infer<typeof loginValidation>

export function Login() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { session, setSession } = useSession()
  const [isLoginDisabled, setIsLoginDisabled] = useState(true)
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
    setIsLoginDisabled(true)

    try {
      const response = await api.post("/v1/user/sign_in", {
        user: {
          email: data.email,
          password: data.password,
        },
      })
      localStorage.setItem("session", JSON.stringify(response.data))
      setSession(response.data)
      const token = (response.data as Session).user.token
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate("/")
    } catch (error) {
      console.error(error)
      toast({
        title: "Ocorreu um erro ao fazer o login. Por favor, tente novamente.",
      })
      setIsLoginDisabled(false)
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
            <input
              type="password"
              placeholder="Senha"
              {...register("password")}
            ></input>
            {formState.errors.password && (
              <p role="alert">{formState.errors.password.message}</p>
            )}
            <Button className="mt-4" disabled={isLoginDisabled}>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
