import React, {Component} from 'react'
import {Redirect} from 'react-router'
import Guesser from './guesser'
import ReactWhiteboard from './reactWhiteboard'
import {connect} from 'react-redux'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: props.location.room,
    }
  }

  render() {
    return (
      <div>
        {this.props.user.isArtist ? (
          <ReactWhiteboard room={this.state.room} />
        ) : (
          <Guesser room={this.state.room} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(Game)
