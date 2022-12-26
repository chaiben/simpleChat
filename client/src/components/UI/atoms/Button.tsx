import React from 'react'
import styled from 'styled-components'
import { colors, radius } from '../../../styles'

const CenterContent = styled.div`
  text-align: center;
`

const ButtonStyle = styled.button`
  background-color: ${colors.main};
  border: 1px solid ${colors.main};
  color: ${colors.white};
  border-radius: ${radius};
  cursor: pointer;
  padding: 0.5rem 2rem;
`

interface Props {
  children: string
  type?: 'button' | 'submit' | 'reset' | undefined
}

const Button: React.FC<Props> = ({ children, type }) => {
  return (
    <CenterContent>
      <ButtonStyle type={type}>{children}</ButtonStyle>
    </CenterContent>
  )
}

export { Button }
