import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Col, Row, Container} from 'react-bootstrap'

const Home = () => {
  return (
    <Container className="Buttons">
      <Row className="justify-content-md-center">
        <h1 className="Welcome">DrawBit</h1>
      </Row>
      <Row className="justify-content-md-center">
        <Link to="/login">
          <Button className="shadow-lg" variant="success">
            Join Room
          </Button>
        </Link>
      </Row>
      <div className="mt-5">
        <Row className="justify-content-md-center">
          <Link to="/">
            <Button className="shadow-lg" variant="primary">
              Continue As Guest
            </Button>
          </Link>
        </Row>
      </div>
      <div className="mt-5">
        <Row className="justify-content-md-center">
          <Link to="/signup">
            <Button className="shadow-lg p-3" variant="primary">
              Sign Up
            </Button>
          </Link>
        </Row>
      </div>
    </Container>
  )
}

export default Home
