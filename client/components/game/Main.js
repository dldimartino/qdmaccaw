import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Col, Row, Container} from 'react-bootstrap'
import {GoMarkGithub} from 'react-icons/go' // Github Octicon

// library.add(faCoffee)

const Main = () => {
  const song = new Audio('http://robuwaldorf.bandcamp.com/track/nes-song')

  return (
    <Container className="Buttons">
      <Row className="justify-content-md-center ">
        <h1 className="Welcome">DrawBit</h1>
      </Row>
      <Row className="justify-content-md-center">
        <Link to="/login">
          <Button size="lg" className="shadow-lg" variant="success">
            Login
          </Button>
        </Link>
      </Row>
      <div className="mt-5">
        <Row className="justify-content-md-center">
          <Link to="/signup">
            <Button size="lg" className="shadow-lg" variant="primary">
              Sign Up
            </Button>
          </Link>
        </Row>
      </div>
      <div className="mt-5">
        <Row className="justify-content-md-center">
          <Link to="/room">
            <Button className="shadow-lg" variant="primary">
              Play As Guest
            </Button>
          </Link>
        </Row>
      </div>
      <div className="mt-5">
        <Row className="justify-content-md-center">
          <Link to="/github">
            <GoMarkGithub color="black" size="25px" />
          </Link>
        </Row>
      </div>
    </Container>
  )
}

export default Main
