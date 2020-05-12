import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Col, Row} from 'react-bootstrap'

const Main = () => {
  return (
    <Col>
      <h1>DrawBit</h1>
      <Link to="/login">
        <Button variant="success">Join Room</Button>
      </Link>
      <br />
      <Link to="/signup">
        <button type="button">Sign Up</button>
      </Link>
      <br />
      <Link to="/">
        <button type="button">Continue as Guest</button>
      </Link>
    </Col>
  )
}

export default Main
