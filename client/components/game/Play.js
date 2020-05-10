import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/allUsers'
import {AllPlayers} from './AllPlayers'

export class Play extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    console.log('this.props: ', this.props)
    return (
      <div>
        <AllPlayers allUsers={this.props.allUsers} />
      </div>
    )
  }
}

const mapState = state => ({
  allUsers: state.allUsers
})

const mapDispatch = dispatch => ({
  fetchUsers: () => {
    dispatch(fetchUsers())
  }
})

export default connect(mapState, mapDispatch)(Play)
