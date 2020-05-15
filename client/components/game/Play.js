import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/allUsers'
import {fetchWord} from '../../store/word'
import {roomDeleteUser} from '../../store/allRoom'

export class Play extends Component {
  constructor() {
    super()
    this.state = {
      room: {},
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const room = this.props.match.params.roomId
    const user = this.props.user.id
    this.props.roomDeleteUser(room, user)
  }

  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchWord()
    this.props.rooms.allRoom.map((rooms) => {
      if (rooms.id === +this.props.match.params.roomId) {
        this.setState({room: rooms})
      }
    })
  }

  render() {
    return (
      <div>
        <Link to="/FindRoom" className="link" onClick={this.handleClick}>
          <button type="button">Back To</button>
        </Link>
        <h1>Welcome to {this.state.room.name}</h1>
        <Link to={{pathname: '/game', room: this.state.room}} className="link">
          Play a game!
        </Link>
      </div>
    )
  }
}

const mapState = (state) => ({
  allUsers: state.allUsers,
  word: state.word,
  rooms: state.allRoom,
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  fetchUsers: () => {
    dispatch(fetchUsers())
  },
  fetchWord: () => {
    dispatch(fetchWord())
  },
  roomDeleteUser: (roomId, userId) => {
    dispatch(roomDeleteUser(roomId, userId))
  },
})

export default connect(mapState, mapDispatch)(Play)
