import styled from 'styled-components'

interface Props {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
}

const FlexBox = styled.div<Props>`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  flex-direction: ${({ direction }) => direction ?? 'column'};
`

export { FlexBox }
