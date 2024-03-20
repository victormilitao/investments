import { FormEvent } from 'react'
import { ButtonStyled, ButtonVariant } from './button.style'

interface ButtonProps {
  onClick?: (event: FormEvent) => void
  children?: React.ReactNode
  className?: string
  variant?: ButtonVariant
  type?: 'button' | 'submit'
  disabled?: boolean
}

const disbaledBg = {
  primary: 'disabled:opacity-35',
  secondary: 'disabled:opacity-35'
}

export function Button(props: ButtonProps) {
  return (
    <ButtonStyled
      type={props.type || 'submit'}
      className={`${props.className} ${disbaledBg[props.variant || 'primary']}`}
      onClick={props.onClick}
      variant={props.variant || 'primary'}
      disabled={props.disabled}
    >
      {props.children}
    </ButtonStyled>
  )
}
