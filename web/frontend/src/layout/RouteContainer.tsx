import React, { ReactNode } from 'react'
import Header from './Header'

interface RouteContainerProps {
  children?: ReactNode;
}

function RouteContainer ({ children }: RouteContainerProps): React.ReactElement {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default RouteContainer
