import { FormEvent } from 'react'
import { ButtonStyled, ButtonVariant } from './button.style'
import { LoaderCircle } from 'lucide-react'

interface ButtonProps {
  onClick?: (event: FormEvent) => void
  children?: React.ReactNode
  className?: string
  variant?: ButtonVariant
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
}

export function Button(props: ButtonProps) {
  return (
    <ButtonStyled
      type={props.type || 'submit'}
      className={`${props.className} rounded-md disabled:opacity-35 disabled:cursor-not-allowed`}
      onClick={props.onClick}
      variant={props.variant || 'primary'}
      disabled={props.disabled || props.loading}
    >
      <span className="flex justify-center">
        {!props.loading && props.children}
        {props.loading && (
          <LoaderCircle className="animate-spin ml-1" strokeWidth={3} />
        )}
      </span>
    </ButtonStyled>
  )
}
