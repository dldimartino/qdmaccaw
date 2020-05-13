import React from 'react'
import {Link} from 'react-router-dom'

const Main = () => {
  return (
    <div>
      <h1>DrawBit</h1>
      <Link to="/login">
        <button type="button">Login</button>
      </Link>
      <br />
      <Link to="/signup">
        <button type="button">Sign Up</button>
      </Link>
      <br />
      <Link to="/">
        <button type="button">Continue as Guest</button>
      </Link>
    </div>
  )
}

export default Main
