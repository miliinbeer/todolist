import React from 'react'

export const List = ({className, children}) => {
  return (
    <>
      <ul className={className}>{ children}</ul>
    </>
  )
}
