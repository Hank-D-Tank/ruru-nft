import React from 'react'
import notFound from '../assets/not-found.gif'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="error-not-found">
        <img src={notFound} alt="" />
        <h2>Wrong page bud, <Link to="/">Go Back!</Link></h2>
    </div>
  )
}

export default Error