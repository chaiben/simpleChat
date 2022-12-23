import styled from 'styled-components'
import { colors } from '../../../styles'

interface Props {
  color?: string
}

const Button = styled.button<Props>`
  color: ${({ color }) => color ?? colors.main};
`

export { Button }
