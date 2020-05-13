import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

const Main = () => {
  return (
    <div>
      <h1>Drawbit</h1>

      <Link to="/room">
        <Button variant="success">Join Room!</Button>
      </Link>

      <Link to="/create">
        <button type="button">Create Room!</button>
      </Link>

      <Link to="/Instruction">
        <button type="button">How to Play!</button>
      </Link>
    </div>
  )
}

export default Main
