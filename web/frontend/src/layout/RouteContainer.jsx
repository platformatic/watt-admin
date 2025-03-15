import React from 'react'
import Header from './Header'

function RouteContainer ({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default RouteContainer
