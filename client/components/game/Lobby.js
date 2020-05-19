import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/allUsers'
import {usersInRoom, roomDeleteUser} from '../../store/allRoom'
import {fetchWord} from '../../store/word'
import io from 'socket.io-client'
import Chatroom from '../chatroom'
const socket = io.connect(window.location.origin)

import {AllPlayers} from './AllPlayers'

export class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: props.location.room,
      timer: '',
      gameWord: '------',
    }
    this.handleClick = this.handleClick.bind(this)
    this.wordGenerator = this.wordGenerator.bind(this)
    this.handlePass = this.handlePass.bind(this)
    this.startGame = this.startGame.bind(this)
  }

  componentDidMount() {
    // Socket connect to room
    socket.emit('join_lobby', this.state.room.name, this.props.user)

    // LISTEN FOR ARTIST WORD GENERATION
    socket.on('send_word', (newWord) => {
      this.setState({gameWord: newWord})
    })

    // LISTEN FOR LATE LOBBY JOINING
    if (this.props.user.isArtist) {
      socket.on('join_lobby_late', (user) => {
        console.log('USER', user)
        socket.emit('word_generate', this.state.gameWord, this.state.room.name)
      })
    }
  }

  handleClick() {
    const room = this.props.match.params.roomId
    const user = this.props.user.id
    this.props.roomDeleteUser(room, user)

    // Leave Lobby
    socket.emit('leave_lobby', this.state.room.name)
  }

  gameTimer() {
    //add a set timeout/delay to countdown
    let time = 30
    let countdown = setInterval(() => {
      if (this.state.timer < 0) clearInterval(countdown)
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

  wordGenerator() {
    let newWord = this.props.word[
      Math.floor(Math.random() * (this.props.word.length - 1)) + 1
    ].content
    this.setState({
      gameWord: newWord,
    })
    socket.emit('word_generate', newWord, this.state.room.name)
  }

  //guess checker
  // does input form guess ==== socket word message?

  //artist
  //<h1> socket.message <h1>

  // Only for Artist - Can pass being artist to someone else
  handlePass() {
    console.log(this.props.inRoom)
  }

  startGame() {
    return <Redirect to="/game" />
  }

  render() {
    console.log(this.state.gameWord)
    return (
      <div>
        <Link to="/FindRoom" className="link" onClick={this.handleClick}>
          <button type="button">Back To Find Rooms</button>
        </Link>
        <h1>Welcome to {this.state.room.name}!</h1>
        {this.props.user.isArtist ? (
          <div>
            <h1>Hello, {this.props.user.name}</h1>
            <h1>you are the artist this round</h1>
            <br />
            <h1>Your word is: {this.state.gameWord} </h1>
            <button type="button" onClick={this.handlePass}>
              Pass The Paintbrush
            </button>
            <button type="button" onClick={this.wordGenerator}>
              Regenerate Word
            </button>
            <button type="button" onClick={this.startGame}>
              Start Game!
            </button>
          </div>
        ) : (
          ''
        )}
        {/* <AllPlayers inRoom={this.props.inRoom} /> */}
        <Chatroom
          room={this.state.room}
          user={this.props.user}
          users={this.props.allUsers}
        />
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

export default connect(mapState, mapDispatch)(Lobby)
