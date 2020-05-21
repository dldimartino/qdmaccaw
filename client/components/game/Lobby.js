import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/allUsers'
import {usersInRoom, roomDeleteUser, roomAddUser} from '../../store/allRoom'
import {fetchWord} from '../../store/word'
import io from 'socket.io-client'
import Chatroom from '../chatroom'
import Axios from 'axios'
const socket = io.connect(window.location.origin)

import {AllPlayers} from './AllPlayers'

export class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: this.props.location.state.lobby,
      gameWord: '------',
      starting: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.wordGenerator = this.wordGenerator.bind(this)
    this.handlePass = this.handlePass.bind(this)
    this.startGame = this.startGame.bind(this)
  }

  componentDidMount() {
    console.log('ROOM -------->>>>>>>', this.state.room)
    this.props.usersInRoom(this.state.room.id)
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

    if (this.props.user.isArtist) {
      this.wordGenerator()
    }
  }

  handleClick() {
    const room = this.props.match.params.roomId
    const user = this.props.user.id
    this.props.roomDeleteUser(room, user)

    // LEAVE SOCKET LOBBY
    socket.emit('leave_lobby', this.state.room.name, this.props.user)
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
  async handlePass() {
    console.log('THIS>STATE>ROOM ------->>>>>>>>', this.state.room)
    console.log('THIS>PROPS!!!! ------->>>>>', this.props)
    console.log('THIS>PROPS>INROOM --------->>>>>>>>', this.props.inRoom)
    let randomNum =
      Math.floor(Math.random() * (this.props.inRoom.length - 1)) + 1
    console.log('RANDOMNUM ------>>>>>>>>', randomNum)
    const nextArtist = this.props.inRoom[randomNum - 1]
    console.log('NEXTARTIST------>>>>>>', nextArtist)
    await Axios.put(`/api/users/setAsArtist/${this.props.user.id}/false`)
    await Axios.put(
      `/api/users/setAsArtist/${this.props.inRoom[randomNum - 1].id}/true`
    )
  }

  startGame() {
    socket.emit('start_game', this.state.room.name)
  }

  render() {
    return (
      <div>
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
        {this.props.user.isArtist ? (
          <div>
            <h1>
              Get ready {this.props.user.name}, YOU are the artist this round!
            </h1>
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
          <h1>...Waiting for Artist to start the game</h1>
        )}
        <Chatroom
          room={this.state.room}
          user={this.props.user}
          inRoom={this.props.inRoom}
          socket={socket}
          leaveLobby={this.handleClick}
        />
      </div>
    )
  }
}

const mapState = (state) => ({
  // allUsers: state.allUsers,
  inRoom: state.allRoom.inRoom,
  // inRoom: state.allRoom.inRoom,
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
  roomAddUser: (roomId, userId) => {
    dispatch(roomAddUser(roomId, userId))
  },
})

export default connect(mapState, mapDispatch)(Lobby)
