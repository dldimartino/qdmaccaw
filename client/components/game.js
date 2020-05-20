import React, {Component} from 'react'
import {Redirect} from 'react-router'
import Guesser from './Guesser'
import Artist from './Artist'
import {connect} from 'react-redux'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: props.location.room,
      word: props.location.word,
      socket: props.location.socket,
    }
  }

  render() {
    return (
      <div>
        {this.props.user.isArtist ? (
          <Artist
            room={this.state.room}
            word={this.state.word}
            socket={this.state.socket}
          />
        ) : (
          <Guesser
            room={this.state.room}
            word={this.state.word}
            socket={this.state.socket}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(Game)
