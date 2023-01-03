import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouterProps {
  children: any
  auth: boolean
}

const ProtectedRouter: React.FC<ProtectedRouterProps> = ({
  children,
  auth,
  ...rest
}) => {
  const location = useLocation()
  return (
    <>
      {auth && children}
      {!auth && <Navigate to="/" replace={true} state={{ from: location }} />}
    </>
  )
}

export default ProtectedRouter
