import React from 'react'
import { colors } from '../../../styles'
import styled from 'styled-components'
import { User } from '../../../interfaces/userInterface'

interface Props {
  color?: string
  setLoggedUser: React.Dispatch<React.SetStateAction<User | null>>
}

const SvgButton = styled.svg`
  cursor: pointer;
`

export const LogoutButton = ({ color, setLoggedUser }: Props): JSX.Element => {
  return (
    <SvgButton
      onClick={() => {
        localStorage.clear()
        setLoggedUser(null)
      }}
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9933 0.88338C11.9355 0.386044 11.5128 0 11 0C10.4477 0 10 0.44772 10 1V10L10.0067 10.1166C10.0645 10.614 10.4872 11 11 11C11.5523 11 12 10.5523 12 10V1L11.9933 0.88338ZM15.4004 2.91575C14.8943 2.69463 14.3048 2.92564 14.0836 3.43173C13.8625 3.93782 14.0935 4.52733 14.5996 4.74845C17.7803 6.13817 20 9.311 20 13C20 17.9706 15.9706 22 11 22C6.02944 22 2 17.9706 2 13C2 9.311 4.21965 6.13817 7.4004 4.74845C7.9065 4.52733 8.1375 3.93782 7.9164 3.43173C7.6952 2.92564 7.1057 2.69463 6.59963 2.91575C2.71673 4.61226 0 8.4878 0 13C0 19.0751 4.92487 24 11 24C17.0751 24 22 19.0751 22 13C22 8.4878 19.2833 4.61226 15.4004 2.91575Z"
        fill={color != null ? color : colors.error}
      />
    </SvgButton>
  )
}
