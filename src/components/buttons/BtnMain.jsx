import React from 'react'
import { Link } from 'react-router-dom'

const BtnMain = ({ children, to = "" }) => {
  return (
    to ? (

      <Link className="btn btn-main" to={to}> {children} </Link>
    ) : (

      <button className="btn btn-main"> {children} </button>
    )
  )
}

export default BtnMain