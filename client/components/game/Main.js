import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Button, Row, Container} from 'react-bootstrap'
import {logout} from '../../store'

export const Main = (props) => {
  const {name, handleClick} = props
  return (
    <Container className="Buttons">
      <Row className="justify-content-md-center ">
        <h1 className="Welcome">DrawBit</h1>
      </Row>
      <Row className="justify-content-md-center">
        <h3>Welcome, {name}</h3>
      </Row>

      <div className="mt-5">
        <Row className="justify-content-md-center">
          <Link to="/FindRoom">
            <Button variant="success" size="lg" className="shadow-lg">
              Join Room!
            </Button>
          </Link>
        </Row>
      </div>

      <div className="mt-5">
        <Row className="justify-content-md-center">
          <Link to="/create">
            <Button variant="primary" size="lg" className="shadow-lg">
              Create Room!
            </Button>
          </Link>
        </Row>
      </div>

      <div className="mt-5">
        <Row className="justify-content-md-center">
          <Link to="/Instruction">
            <Button variant="warning" size="lg" className="shadow-lg">
              How to Play!
            </Button>
          </Link>
        </Row>
      </div>

      <div className="mt-5">
        <Row className="justify-content-md-center">
          <Button
            variant="danger"
            size="lg"
            className="shadow-lg"
            onClick={handleClick}
          >
            Logout
          </Button>
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

export default connect(mapState, mapDispatch)(Main)
