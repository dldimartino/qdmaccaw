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
    }
  }

  render() {
    console.log('WORD IN GAME COMP', this.state.word)
    return (
      <div>
        {this.props.user.isArtist ? (
          <Artist room={this.state.room} word={this.state.word} />
        ) : (
          <Guesser room={this.state.room} word={this.state.word} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(Game)
