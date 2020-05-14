import React, {Component} from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'

class Game extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        {this.props.user.isArtist ? (
          <Redirect to="/whiteboard" />
        ) : (
          <Redirect to="/guesser" />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(Game)
