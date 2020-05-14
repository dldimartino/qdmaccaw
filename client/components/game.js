import React, {Component} from 'react'
import {Redirect} from 'react-router'
import Guesser from './guesser'
import ReactWhiteboard from './reactWhiteboard'
import {connect} from 'react-redux'

class Game extends Component {
  constructor() {
    super()
    this.state = {
      room: this.props.location.room,
    }
  }

  render() {
    return (
      <div>{this.props.user.isArtist ? <ReactWhiteboard /> : <Guesser />}</div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(Game)
