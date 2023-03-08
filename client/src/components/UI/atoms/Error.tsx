import styled from 'styled-components'
import { colors } from '../../../styles'

interface ErrorProps {
  margin?: string
}

const Error = styled.div<ErrorProps>`
  color: ${colors.error};
  font-weight: 300;
  font-size: 0.7rem;
  margin: ${({ margin }) => margin ?? '0'};
`

export { Error }
