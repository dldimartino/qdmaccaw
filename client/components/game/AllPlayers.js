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
        {/* {this.props.user.map(user => {
          return null //user.name
        })} */}
      </div>
    )
  }
}

const mapState = state => ({
  users: state.users
})

const mapDispatch = dispatch => ({
  getUsers: () => {
    dispatch(getUsers())
  }
})

export default connect(mapState, mapDispatch)(AllPlayers)
