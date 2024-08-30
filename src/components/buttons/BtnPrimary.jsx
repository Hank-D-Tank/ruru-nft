import React from 'react'
import { Link } from 'react-router-dom'

const BtnPrimary = ({ children, to = "" }) => {
  return (
    to ? (
      <Link to={to} className="btn btn-primary">
        {children}
      </Link>
    ) : (
      <button className='btn btn-primary'>
        {children}
      </button>
    )
  )
}

export default BtnPrimary
