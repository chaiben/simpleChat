import styled from 'styled-components'
import { colors } from '../../../styles'

interface Props {
  color?: string
}

const H1 = styled.h1<Props>`
  color: ${({ color }) => color ?? colors.dark};
  font-weight: 700;
  font-size: 2.25rem;
  margin-top: 0;
`

export { H1 }
