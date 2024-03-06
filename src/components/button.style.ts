import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary'

interface ButtonVariantProps {
  variant: ButtonVariant
}

const buttonVariants = {
  primary: '--ds-orange-500',
  secondary: 'red'
}

export const ButtonStyled = styled.button<ButtonVariantProps>`
  padding: 18px;
  border-radius: 5px;
  font-weight: 500;
  min-width: 200px;
  /* background-color: var(--ds-orange-500);
  color: var(--ds-black-400); */

  ${(props) => {
    return `background-color: var(${buttonVariants[props.variant]})`
  }}
`
