import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {logout} from '../../store'

export const Main = (props) => {
  const {name, handleClick} = props
  return (
    <div>
      <h1>Drawbit</h1>
      <h3>Welcome, {name}</h3>

      <Link to="/room">
        <Button variant="success">Join Room!</Button>
      </Link>

      <Link to="/create">
        <button type="button">Create Room!</button>
      </Link>

      <Link to="/Instruction">
        <button type="button">How to Play!</button>
      </Link>

      <button type="button" onClick={handleClick}>
        Logout
      </button>
    </div>
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
