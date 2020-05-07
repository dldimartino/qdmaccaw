import React, {Component} from 'react'
import {connect} from 'react-redux'

export class AllPlayers extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        {this.props.players.map(player => {
          return player.name
        })}
      </div>
    )
  }
}

const mapState = state => ({
  players: state.players
})

const mapDispatch = dispatch => ({
  getStudents: () => {
    dispatch(getStudents())
  }
})

export default connect(mapState, mapDispatch)(AllPlayers)
