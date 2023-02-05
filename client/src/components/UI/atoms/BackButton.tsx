import React from 'react'
import { colors } from '../../../styles'
import styled from 'styled-components'

interface Props {
  color?: string
}

const SvgButton = styled.svg`
  cursor: pointer;
`

export const BackButton = ({ color }: Props): JSX.Element => {
  return (
    <SvgButton
      width="25"
      height="18"
      viewBox="0 0 25 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.611564 8.53202L9.55732 1.12982C9.55732 1.12982 10.6186 0.00756264 10.6186 1.22483C10.6186 2.44658 10.6186 5.39563 10.6186 5.39563C10.6186 5.39563 11.3366 5.39563 12.4338 5.39563C15.5836 5.39563 21.3078 5.39563 23.6366 5.39563C23.6366 5.39563 24.2721 5.2307 24.2721 6.18892C24.2721 7.14982 24.2721 11.3726 24.2721 12.0601C24.2721 12.7458 23.7414 12.7315 23.7414 12.7315C21.4727 12.7315 15.5549 12.7315 12.5126 12.7315C11.5248 12.7315 10.8848 12.7315 10.8848 12.7315C10.8848 12.7315 10.8848 15.0952 10.8848 16.5832C10.8848 18.0658 9.77334 16.9489 9.77334 16.9489C9.77334 16.9489 1.41471 10.6519 0.536269 9.77708C-0.0992558 9.13707 0.611564 8.53202 0.611564 8.53202Z"
        fill={color != null ? color : colors.main}
      />
    </SvgButton>
  )
}
