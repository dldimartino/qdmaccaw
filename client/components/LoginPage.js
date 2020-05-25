import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
// import {Link} from 'react-router-dom'
import {Button, Row, Container, Form, Col} from 'react-bootstrap'
import classNames from 'classnames'

const LoginPage = (props) => {
  const {name, displayName, handleSubmit, error} = props
  const displayPg = classNames('authPg')

  return (
    <Container className="Buttons">
      <Row className="justify-content-center">
        <h1 className="Welcome">DrawBit</h1>
      </Row>
      <Row className="justify-content-center">
        <h2 className={displayPg}>{displayName}</h2>
      </Row>

      <form
        onSubmit={handleSubmit}
        name={name}
        className="justify-content-center"
      >
        <Row className="justify-content-center">
          <Col xs={5} sm={5} lg={4}>
            <Form.Control name="dataName" type="text" placeholder="Name" />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={5} sm={5} lg={4}>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
            />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={5} sm={5} lg={4}>
            <Button type="submit" size="lg" variant="success" block>
              {displayName}
            </Button>
          </Col>
        </Row>

        {error && error.response && (
          <Row className="justify-content-center">
            <div className="fontColor">{error.response.data}</div>
          </Row>
        )}

        <Row className="justify-content-center">
          {/* <Link to="/" block> */}
          <Col xs={5} sm={5} lg={4}>
            <Button href="/" variant="danger" size="lg" block>
              Back
            </Button>
          </Col>
          {/* </Link> */}
        </Row>
      </form>

      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </Container>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      // const email = evt.target.email.value
      const dataName = evt.target.dataName.value
      const password = evt.target.password.value
      dispatch(auth(/*email*/ dataName, password, formName))
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(LoginPage)
export const Signup = connect(mapSignup, mapDispatch)(LoginPage)

/**
 * PROP TYPES
 */
LoginPage.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
