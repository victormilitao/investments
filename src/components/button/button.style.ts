import styled from "styled-components"

export type ButtonVariant = "primary" | "secondary"

interface ButtonVariantProps {
  variant: ButtonVariant
}

const buttonVariants = {
  primary: "--primary-btn",
  secondary: "--secondary-btn",
}

const buttonColors = {
  primary: "--ds-black-400",
  secondary: "--ds-black-400",
}

export const ButtonStyled = styled.button<ButtonVariantProps>`
  padding: 18px;
  border-radius: 5px;
  font-weight: 500;

  ${(props) => {
    return `
      background-color: var(${buttonVariants[props.variant]});
      color: var(${buttonColors[props.variant]})
    `
  }}
`
