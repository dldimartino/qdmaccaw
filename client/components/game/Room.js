import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AllRoom} from './AllRoom'
import {fetchRoom, filterRoom} from '../../store/allRoom'
import {roomAddUser} from '../../store/allUsers'

export class Room extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKey = this.handleKey.bind(this)
    this.addUserToRoom = this.addUserToRoom.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
    this.props.filterRoom(event.target.value)
  }

  addUserToRoom(userId, roomId) {
    this.props.roomAddUser(userId, roomId)
  }

  handleKey(event) {
    console.log('selectedRoom: ', this.props)
    if (
      event.key === 'Enter' &&
      this.props.selectedRoom[0].name === event.target.value
    ) {
      this.props.history.push(`/play/${this.props.selectedRoom[0].id}`)
    }
  }

  componentDidMount() {
    this.props.fetchRoom()
  }

  render() {
    // console.log('props.name: ', this.props.name)
    return (
      <div>
        <Link to="/main">
          <button type="button">Back</button>
        </Link>
        <form>
          <label htmlFor="search">Search Room:</label>
          <input
            type="search"
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
            onKeyDown={this.handleKey}
          />
        </form>
        <AllRoom
          selectedRoom={this.props.selectedRoom}
          addUserToRoom={this.addUserToRoom}
          playerId={this.props.userId}
        />
      </div>
    )
  }
}

const mapState = (state) => ({
  allRoom: state.allRoom.allRoom,
  selectedRoom: state.allRoom.selectedRoom,
  userId: state.user.id,
})

const mapDispatch = (dispatch) => ({
  fetchRoom: () => {
    dispatch(fetchRoom())
  },
  filterRoom: (value) => {
    dispatch(filterRoom(value))
  },
  roomAddUser: (userId, roomId) => {
    dispatch(roomAddUser(userId, roomId))
  },
})

export default connect(mapState, mapDispatch)(Room)
