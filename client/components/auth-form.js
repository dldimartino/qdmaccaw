import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import {Button, Row, Container} from 'react-bootstrap'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Container className="Buttons">
      <Row className="justify-content-md-center ">
        <h2 className="mb-4">{displayName} Page</h2>
      </Row>
      <form onSubmit={handleSubmit} name={name}>
        {/* <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div> */}

        <Row className="justify-content-md-center ">
          {/* <label htmlFor="dataName">
            <small>Name</small>
          </label> */}
          <input name="dataName" type="text" placeholder="Name" />
        </Row>
        <Row className="justify-content-md-center ">
          {/* <label htmlFor="password">
            <small>Password</small>
          </label> */}
          <input name="password" type="password" placeholder="password" />
        </Row>

        <Row className="justify-content-md-center ">
          <Button type="submit" variant="success">
            {displayName}
          </Button>
        </Row>
        {error && error.response && (
          <Row className="justify-content-md-center ">
            {error.response.data}
          </Row>
        )}
        <br />
        <Row className="justify-content-md-center ">
          <Link to="/">
            <Button variant="danger" size="lg" className="shadow-lg">
              Back
            </Button>
          </Link>
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

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
