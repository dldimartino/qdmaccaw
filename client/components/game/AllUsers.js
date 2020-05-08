import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/allUsers'

export class AllUsers extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    console.log('props: ', this.props)
    return !this.props.users ? (
      <div>
        <h1>No Users</h1>
      </div>
    ) : (
      <div>
        {this.props.users.map(user => {
          return user.name
        })}
      </div>
    )
  }
}

const mapState = state => ({
  users: state.users
})

const mapDispatch = dispatch => ({
  fetchUsers: () => {
    dispatch(fetchUsers())
  }
})

export default connect(mapState, mapDispatch)(AllUsers)
