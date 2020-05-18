import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/allUsers'
import {usersInRoom, roomDeleteUser} from '../../store/allRoom'
import {fetchWord} from '../../store/word'

import {AllPlayers} from './AllPlayers'

export class Play extends Component {
  constructor() {
    super()
    this.state = {
      room: {},
      timer: '',
    }
    this.handleClick = this.handleClick.bind(this)
    this.wordGenerator = this.wordGenerator.bind(this)
  }

  handleClick() {
    const room = this.props.match.params.roomId
    const user = this.props.user.id
    this.props.roomDeleteUser(room, user)
  }

  gameTimer() {
    //add a set timeout/delay to countdown
    let time = 30
    let countdown = setInterval(() => {
      if (this.state.timer === 0) clearInterval(countdown)
      time--
      console.log(time)
      this.setState({
        timer: time,
      })
      if (time === 0) {
        window.alert('Round Over!')
      }
    }, 1000)
  }

  wordGenerator(rounds, wordArray) {
    // this.gameTimer()
    let newWord = 'house'
    // wordArray[Math.floor(Math.random() * (100 - 1)) + 1].content
    this.setState({
      gameWord: newWord,
    })
    console.log(this.state.gameWord)
  }

  //guess checker
  // does input form guess ==== socket word message?

  //artist
  //<h1> socket.message <h1>

  componentDidMount() {
    // console.log(this.props)
    const roomId = +this.props.match.params.roomId
    this.props.fetchUsers()
    this.props.usersInRoom(roomId)
    console.log('second')
    this.props.fetchWord()
    this.props.rooms.allRoom.map((rooms) => {
      if (rooms.id === roomId) {
        this.setState({room: rooms})
      }
    })
  }

  render() {
    console.log(this.props)
    let {word} = this.props
    return (
      <div>
        <Link to="/FindRoom" className="link" onClick={this.handleClick}>
          <button type="button">Back To Find Rooms</button>
        </Link>
        <h1>Welcome to {this.state.room.name}</h1>
        <Link to={{pathname: '/game', room: this.state.room}} className="link">
          Play a game!
        </Link>
        {/* <button type="button" onClick={() => this.wordGenerator(1, word)}>
          Generate Word
        </button> */}
        <AllPlayers inRoom={this.props.inRoom} />
      </div>
    )
  }
}

const mapState = (state) => ({
  allUsers: state.allUsers,
  inRoom: state.allRoom.inRoom,
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
  usersInRoom: (roomId) => {
    dispatch(usersInRoom(roomId))
  },
})

export default connect(mapState, mapDispatch)(Play)
