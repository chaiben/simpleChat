import styled from 'styled-components'
import { colors } from '../../../styles'

interface Props {
  color?: string
  mb?: string
}

const H1 = styled.h1<Props>`
  color: ${({ color }) => color ?? colors.main};
  font-weight: 700;
  font-size: 2.25rem;
  margin-top: 0;
  margin-bottom: ${({ mb }) => mb ?? '4rem'};
`

export { H1 }
