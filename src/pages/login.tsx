import { ChangeEvent, FormEvent, useState } from "react"
import { BrowserRouter, Navigate, useNavigate} from 'react-router-dom'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleEmail(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event?.target?.value)
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event?.target?.value)
  }

  function handleLogin(event: FormEvent) {
    event.preventDefault()
    console.dir(email)
    console.dir(password)
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-16 w-1/3 h-[650px] rounded-[10px] bg-ds-black-500 shadow-[0_0_30px_5px] shadow-ds-black-400">
        <p className="text-[36px]">Investments</p>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Email" onChange={handleEmail}></input>
          <input type="password" placeholder="Senha" onChange={handlePassword}></input>
          <button type="button" className="btn-primary mt-4" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  )
}
