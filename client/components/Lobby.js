import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allUsers'
import {usersInRoom, roomDeleteUser, roomAddUser} from '../store/allRoom'
import {fetchWord} from '../store/word'
import {me} from '../store/user'
import io from 'socket.io-client'
import Chatroom from './Chatroom'
import Axios from 'axios'
const moment = require('moment')
const socket = io.connect(window.location.origin)

import {AllPlayers} from './AllPlayers'

export class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: this.props.location.state.lobby,
      gameWord: '------',
      starting: false,
      currentArtist: {},
    }
    this.handleClick = this.handleClick.bind(this)
    this.wordGenerator = this.wordGenerator.bind(this)
    this.handlePass = this.handlePass.bind(this)
    this.startGame = this.startGame.bind(this)
  }

  componentDidMount() {
    this.props.usersInRoom(this.state.room.id)

    // JOIN SOCKET LOBBY
    socket.emit('join_lobby', this.state.room.name, this.props.user)

    // LISTEN FOR ARTIST WORD GENERATION
    socket.on('send_word', (newWord) => {
      this.setState({gameWord: newWord})
    })

    socket.on('left_lobby', (room, user) => {
      this.props.usersInRoom(room.id)
      socket.emit(
        'chat_message',
        ({
          message: `${user.name} has left the room.`,
          name: `${user.name}`,
          timestamp: moment().format('h:mm a'),
        },
        this.props.room.name)
      )
    })

    // LISTEN FOR LATE LOBBY JOINING
    if (this.props.user.isArtist) {
      this.setState({currentArtist: this.props.user})
      socket.on('join_lobby_late', (user) => {
        socket.emit('word_generate', this.state.gameWord, this.state.room.name)
        socket.emit('new_artist', this.state.room.name, this.props.user)
        this.props.usersInRoom(this.state.room.id)
      })
    } else {
      socket.on('join_lobby_late', (user) => {
        this.props.usersInRoom(this.state.room.id)
      })
    }

    // LISTEN FOR GAME START
    socket.on('start_game', (room) => {
      this.setState({starting: true})
    })

    // LISTEN FOR UPDATED ARTIST
    socket.on('artist_incoming', (artist) => {
      this.setState({currentArtist: artist})
      console.log(
        'THIS>STATE>CURRENTARTIST ------>>>>>>',
        this.state.currentArtist
      )
    })

    if (this.props.user.isArtist) {
      this.wordGenerator()
    }
  }

  async handleClick() {
    const room = this.props.match.params.roomId
    const user = this.props.user.id
    this.props.roomDeleteUser(room, user)
    if (
      this.props.user.name === this.state.currentArtist.name &&
      this.props.inRoom.length > 1
    ) {
      this.handlePass()
    }
    if (
      this.props.user.name === this.state.currentArtist.name &&
      this.props.inRoom.length === 1
    ) {
      await Axios.put(`/api/users/setAsArtist/${this.props.user.id}/false`)
      await Axios.delete(`/api/room/${this.state.room.id}/destroy`)
      socket.emit('room_update')
      // this.props.usersInRoom(this.state.room.id)
    }
    setTimeout(() => {
      this.props.history.push({
        pathname: `/FindRoom`,
        // state: {lobby: room},
      })
    }, 0)
    // LEAVE SOCKET LOBBY
    socket.emit('leave_lobby', this.state.room, this.props.user)
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

  async handlePass() {
    console.log('CLICKED')
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    let randomNum = getRandomIntInclusive(0, this.props.inRoom.length - 1)
    // Math.floor(Math.random() * (this.props.inRoom.length - 1)) +1
    if (this.props.inRoom.length > 1) {
      while (this.props.inRoom[randomNum].id === this.state.currentArtist.id) {
        randomNum = getRandomIntInclusive(0, this.props.inRoom.length - 1)
      }
    } else {
      randomNum = 0
    }
    const nextArtist = this.props.inRoom[randomNum]
    const nextArtistId = nextArtist.id
    const currentArtist = this.props.user
    const currentArtistId = currentArtist.id
    await Axios.put(`/api/users/setAsArtist/${currentArtistId}/false`)
    await Axios.put(`/api/users/setAsArtist/${nextArtistId}/true`)
    await socket.emit('new_artist', this.state.room.name, nextArtist)
    this.props.usersInRoom(this.state.room.id)
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
              currentArtist: this.state.currentArtist,
              socket,
            }}
          />
        ) : (
          ''
        )}
        <Chatroom
          room={this.state.room}
          word={this.props.word}
          user={this.props.user}
          inRoom={this.props.inRoom}
          gameWord={this.state.gameWord}
          currentArtist={this.state.currentArtist}
          socket={socket}
          leaveLobby={this.handleClick}
          handlePass={this.handlePass}
          startGame={this.startGame}
          handleClick={this.handleClick}
          wordGenerator={this.wordGenerator}
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
  getUser: () => dispatch(me()),
})

export default connect(mapState, mapDispatch)(Lobby)
