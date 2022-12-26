import styled from 'styled-components'
import { colors, radius } from '../../../styles'

interface Props {
  error?: string
}

const Input = styled.input<Props>`
  font-family: 'Roboto';
  border-radius: ${radius};
  padding: 0.5rem 1rem;
  border: 1px solid
    ${({ error }) =>
      error === 'true' || error === '1' ? colors.error : colors.dark};
`

export { Input }
