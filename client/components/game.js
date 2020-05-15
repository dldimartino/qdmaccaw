import React, {Component} from 'react'
import {Redirect} from 'react-router'
import Guesser from './guesser'
import ReactWhiteboard from './reactWhiteboard'
import {connect} from 'react-redux'

class Game extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.setState({room: this.props.location.room})
  }

  render() {
    console.log(this.state)
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
