import React, {Component, createRef} from 'react'
import io from 'socket.io-client'
import CanvasDraw from 'react-canvas-draw'
import {Col, Row, Container} from 'react-bootstrap'
import {updateWinner} from '../store/allUsers'
import {connect} from 'react-redux'
const canvas = createRef()

class Game extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    if (this.props.user) {
      console.log('TRUE')
    } else {
      console.log('FALSE')
    }
  }

  render() {
    return <div> loading </div>
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
