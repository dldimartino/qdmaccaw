import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Col, Row, Container} from 'react-bootstrap'

const Main = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>DrawBit</h1>
      </Row>
      <Row className="justify-content-md-center">
        <Link to="/login">
          <Button variant="success">Join Room</Button>
        </Link>
      </Row>
      <Row className="justify-content-md-center">
        <Link to="/signup">
          <Button variant="primary">Sign Up</Button>
        </Link>
      </Row>
      <Row className="justify-content-md-center">
        <Link to="/">
          <Button variant="primary">Continue As Guest</Button>
        </Link>
      </Row>
    </Container>
  )
}

export default Main
