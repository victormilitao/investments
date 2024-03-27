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

export function Button(props: ButtonProps) {
  return (
    <ButtonStyled
      type={props.type || 'submit'}
      className={`${props.className} disabled:opacity-35 disabled:cursor-not-allowed`}
      onClick={props.onClick}
      variant={props.variant || 'primary'}
      disabled={props.disabled}
    >
      {props.children}
    </ButtonStyled>
  )
}
