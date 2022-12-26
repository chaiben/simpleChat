import styled from 'styled-components'
import { colors, radius } from '../../../styles'

const Button = styled.button`
  background-color: ${colors.main};
  border: 1px solid ${colors.main};
  color: ${colors.white};
  border-radius: ${radius};
  cursor: pointer;
  padding: 0.5rem 2rem;
`

export { Button }
