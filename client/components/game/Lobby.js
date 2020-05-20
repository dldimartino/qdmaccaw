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
      room: this.props.location.state.lobby,
      timer: '',
      gameWord: '------',
      starting: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.wordGenerator = this.wordGenerator.bind(this)
    this.handlePass = this.handlePass.bind(this)
    this.startGame = this.startGame.bind(this)
  }

  componentDidMount() {
    // JOIN SOCKET LOBBY
    console.log('USER JOINING LOBBY')
    socket.emit('join_lobby', this.state.room.name, this.props.user)

    // LISTEN FOR ARTIST WORD GENERATION
    socket.on('send_word', (newWord) => {
      this.setState({gameWord: newWord})
    })

    // LISTEN FOR LATE LOBBY JOINING
    if (this.props.user.isArtist) {
      socket.on('join_lobby_late', (user) => {
        socket.emit('word_generate', this.state.gameWord, this.state.room.name)
      })
    }

    // LISTEN FOR GAME START
    socket.on('start_game', (room) => {
      this.setState({starting: true})
    })
  }

  handleClick() {
    const room = this.props.match.params.roomId
    const user = this.props.user.id
    this.props.roomDeleteUser(room, user)

    // LEAVE SOCKET LOBBY
    socket.emit('leave_lobby', this.state.room.name)
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
    socket.emit('start_game', this.state.room.name)
  }

  render() {
    return (
      <div>
        <Link to="/FindRoom" className="link" onClick={this.handleClick}>
          <button type="button">Back To Find Rooms</button>
        </Link>
        {this.state.starting ? (
          <Redirect
            to={{
              pathname: '/game',
              room: this.state.room,
              word: this.state.gameWord,
              socket,
            }}
          />
        ) : (
          ''
        )}
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
        <h1> Waiting for Artist to Start Game </h1>
        <Chatroom
          room={this.state.room}
          user={this.props.user}
          inRoom={this.props.inRoom}
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
