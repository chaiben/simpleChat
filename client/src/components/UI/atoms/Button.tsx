import styled from 'styled-components'
import { colors, radius } from '../../../styles'

interface ButtonProps {
  disabled: boolean
}

const Button = styled.button.attrs((props: ButtonProps) => ({
  backgroundColor: props.disabled ? colors.white : colors.main,
  color: props.disabled ? colors.main : colors.white,
  cursor: props.disabled ? 'default' : 'pointer'
}))`
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  border-radius: ${radius};
  cursor: ${(props) => props.cursor};
  padding: 0.5rem 2rem;
`

export { Button }
