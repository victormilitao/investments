import { FormEvent } from 'react'
import { ButtonStyled, ButtonVariant } from './button.style'

interface ButtonProps {
  onClick: (event: FormEvent) => void
  children?: React.ReactNode
  className?: string
  style?: ButtonVariant
}

export function Button(props: ButtonProps) {
  return (
    <ButtonStyled
      type="button"
      className={`${props.className}`}
      onClick={props.onClick}
      variant='primary'
    >
      {props.children}
    </ButtonStyled>
  )
}
