import React from 'react'
import Header from '~/layout/Header'

function PrivateRouteContainer ({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default PrivateRouteContainer
