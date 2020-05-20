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
    }
    this.setTimesUp = this.setTimesUp.bind(this)
  }

  setTimesUp() {
    this.setState({isTimeUp: true})
  }
  componentDidMount() {
    if (this.state.isTimeUp) {
      return <Redirect to={`/lobby/${this.state.room.id}`} />
    }
  }
  render() {
    return (
      <div>
        {this.props.user.isArtist ? (
          <Artist room={this.state.room} setTimesUp={this.setTimesUp} />
        ) : (
          <Guesser room={this.state.room} setTimesUp={this.setTimesUp} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(Game)
