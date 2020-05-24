import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Row, Container, Col} from 'react-bootstrap'
import {connect} from 'react-redux'

const MainPage = () => {
  return (
    <Container className="Buttons">
      <Row className="justify-content-center">
        <h1 className="Welcome">DrawBit</h1>
      </Row>
      <Row className="justify-content-center">
        <Link to="/login">
          <Button size="lg" className="shadow-lg" variant="success">
            Login
          </Button>
        </Link>
      </Row>
      <div className="mt-5">
        <Row className="justify-content-center">
          <Link to="/signup">
            <Button size="lg" className="shadow-lg" variant="primary">
              Sign Up
            </Button>
          </Link>
        </Row>
      </div>
      <div className="mt-5">
        <Row className="justify-content-center">
          <a href="https://github.com/Metallic-Bees/Capstone">
            <img
              id="github_logo"
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            />
          </a>
        </Row>
      </div>
    </Container>
  )
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
  }
}

export default connect(mapState)(MainPage)