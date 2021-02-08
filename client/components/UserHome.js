import React from 'react'
// import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Button, Row, Container, Col} from 'react-bootstrap'
import {logout} from '../store'

export const UserHome = (props) => {
  const {name, handleClick} = props
  return (
    <Container className="Buttons">
      <Row className="justify-content-center ">
        <h1 className="Welcome">Quick-Draw Maccaw</h1>
      </Row>
      <Row className="justify-content-center">
        <h2 className="welcomeUser">Welcome, {name}</h2>
      </Row>
      <div>
        <Row className="justify-content-center mt-4">
          {/* <Link to="/findroom"> */}
          <Col xs={6} sm={5} lg={4}>
            <Button
              href="/findroom"
              variant="success"
              size="lg"
              className="shadow-lg fontColor"
              block
            >
              Join Room!
            </Button>
          </Col>
          {/* </Link> */}
        </Row>

        <Row className="justify-content-center mt-4">
          {/* <Link to="/create"> */}
          <Col xs={6} sm={5} lg={4}>
            <Button
              href="/create"
              variant="primary"
              size="lg"
              className="shadow-lg fontColor"
              block
            >
              Create Room!
            </Button>
          </Col>
          {/* </Link> */}
        </Row>

        <Row className="justify-content-center mt-4">
          {/* <Link to="/Instruction"> */}
          <Col xs={6} sm={5} lg={4}>
            <Button
              href="/Instruction"
              variant="info"
              size="lg"
              className="shadow-lg fontColor"
              block
            >
              How to Play!
            </Button>
          </Col>
          {/* </Link> */}
        </Row>

        <Row className="justify-content-center mt-4">
          <Col xs={6} sm={5} lg={4}>
            <Button
              variant="danger"
              size="lg"
              className="shadow-lg fontColor"
              onClick={handleClick}
              block
            >
              Logout
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

const mapState = (state) => {
  return {
    name: state.user.name,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(UserHome)
