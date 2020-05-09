import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/allUsers'

export class AllPlayers extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    console.log('props: ', this.props)
    return !this.props.allUsers ? (
      <div>
        <h1>No Users</h1>
      </div>
    ) : (
      <div>
        {this.props.allUsers.map(user => {
          return <p key={user.id}>{user.name}</p>
        })}
      </div>
    )
  }
}

const mapState = state => {
  console.log('state: ', state)
  return {allUsers: state.allUsers}
}

const mapDispatch = dispatch => ({
  fetchUsers: () => {
    dispatch(fetchUsers())
  }
})

export default connect(mapState, mapDispatch)(AllPlayers)
