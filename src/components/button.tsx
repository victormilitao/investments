import { FormEvent } from 'react'
import { ButtonStyled, ButtonVariant } from './button.style'

interface ButtonProps {
  onClick: (event: FormEvent) => void
  children?: React.ReactNode
  className?: string
  variant?: ButtonVariant
}

export function Button(props: ButtonProps) {
  return (
    <ButtonStyled
      type="button"
      className={`${props.className}`}
      onClick={props.onClick}
      variant={props.variant || 'primary'}
    >
      {props.children}
    </ButtonStyled>
  )
}
