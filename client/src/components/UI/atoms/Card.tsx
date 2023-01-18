import styled from 'styled-components'
import { colors } from '../../../styles'

interface Props {
  color?: string
}

const Card = styled.div<Props>`
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: ${({ color }) => color ?? colors.main}55;
`

export { Card }
