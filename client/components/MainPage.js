import React from 'react'
// import {Link} from 'react-router-dom'
import {Button, Row, Container, Col} from 'react-bootstrap'
import {connect} from 'react-redux'

const MainPage = () => {
  return (
    <Container className="Buttons">
      <Row className="justify-content-center">
        <h1 className="Welcome">DrawBit</h1>
      </Row>

      <Row className="justify-content-center">
        {/* <Link to="/login"> */}
        <Col xs={5} sm={5} lg={4}>
          <Button
            href="/login"
            size="lg"
            className="shadow-lg"
            variant="success"
            block
          >
            Login
          </Button>
        </Col>
        {/* </Link> */}
      </Row>

      <Row className="justify-content-center mt-5">
        {/* <Link to="/signup"> */}
        <Col xs={5} sm={5} lg={4}>
          <Button
            href="signup"
            size="lg"
            className="shadow-lg"
            variant="primary"
            block
          >
            Sign Up
          </Button>
        </Col>
        {/* </Link> */}
      </Row>

      <Row className="justify-content-center mt-5">
        <a href="https://github.com/Metallic-Bees/Capstone">
          <img
            id="github_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
          />
        </a>
      </Row>
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
