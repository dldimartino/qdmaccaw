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
      isTimeUp: false,
      word: props.location.word,
      socket: props.location.socket,
    }
    this.setTimesUp = this.setTimesUp.bind(this)
  }

  setTimesUp() {
    this.setState({isTimeUp: true})
  }
  componentDidMount() {}

  render() {
    console.log('GAME PROPS --->', this.props)
    if (this.state.isTimeUp) {
      this.props.history.push({
        pathname: `/lobby/${this.state.room.id}`,
        state: {lobby: this.state.room},
      })
    }
    return (
      <div>
        {this.props.user.name === this.props.location.currentArtist.name ? (
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
            history={this.props.history}
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
