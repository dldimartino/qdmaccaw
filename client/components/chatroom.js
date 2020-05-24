import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Button, Container, Badge} from 'react-bootstrap'
import io from 'socket.io-client'
const moment = require('moment')
import {AiFillWechat, AiOutlineSend} from 'react-icons/ai'
const socket = io.connect(window.location.origin)

export default class Chatroom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: props.room,
      message: '',
      messages: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    //joins a room
    socket.emit(
      'join_chat',
      {
        message: `${this.props.user.name} has joined the room.`,
        name: `${this.props.user.name}`,
        timestamp: moment().format('h:mm a'),
      },
      this.props.room.name
    )

    //LISTENS FOR NEW MESSAGE
    socket.on('send_message', (message) => {
      this.setState((prevState) => {
        const {messages} = prevState
        messages.push(message)
        return messages
      })
    })

    //server sends a message
    socket.on('chat_joined', (message) => {
      this.setState((prevState) => {
        const {messages} = prevState
        messages.push(message)
        return messages
      })
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    //EMITING A MESSAGE
    socket.emit(
      'chat_message',
      {
        message: event.currentTarget.message.value,
        name: this.props.user.name,
        timestamp: moment().format('h:mm a'),
      },
      this.props.room.name
    )
    this.setState({
      message: '',
    })
  }

  render() {
    return (
      <div>
        <div className="chat-container">
          <header className="chat-header">
            <h1>Welcome to {this.state.room.name}!</h1>
            <br />
            <h1>
              <i>
                <AiFillWechat /> Lobby
              </i>
            </h1>
          </header>
          <main className="chat-main">
            <div className="chat-sidebar">
              <h1>Users in Lobby:</h1>
              <ul>
                {this.props.inRoom.map((user) => {
                  return <h2 key={user.id}>{user.name}</h2>
                })}
              </ul>
              <h1>
                Current Artist:
                {this.props.user.name === this.props.currentArtist.name
                  ? ' YOU!'
                  : ' ' + this.props.currentArtist.name}
              </h1>
              {this.props.user.name === this.props.currentArtist.name ? (
                <Button
                  type="button"
                  variant="light"
                  onClick={this.props.handlePass}
                  className="artist-button"
                >
                  Pass The Paintbrush
                </Button>
              ) : null}
              {this.props.user.name === this.props.currentArtist.name ? (
                <div>
                  <h1>Your word is: {this.props.gameWord.toUpperCase()} </h1>
                  <Button
                    type="button"
                    variant="light"
                    onClick={this.props.wordGenerator}
                    className="artist-button"
                  >
                    Regenerate Word
                  </Button>
                </div>
              ) : (
                <div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <h4>
                    <Badge variant="light">
                      Waiting for Artist to start game
                    </Badge>
                  </h4>
                </div>
              )}
            </div>
            <div className="chat-messages">
              {this.state.messages.map((message, index) => (
                <div className="message" key={index}>
                  <p className="meta">
                    {message.name} <span>{message.timestamp}</span>
                  </p>
                  <p className="text">{message.message}</p>
                </div>
              ))}
            </div>
          </main>
          <div className="chat-form-container">
            <form id="chat-form" onSubmit={this.handleSubmit}>
              <Link
                to="/FindRoom"
                className="link"
                onClick={this.props.handleClick}
              >
                <Button type="button" variant="danger" className="chat-button">
                  Leave Lobby
                </Button>
              </Link>
              <input
                name="message"
                type="text"
                placeholder="Enter Message"
                value={this.state.message}
                onChange={this.handleChange}
              />
              <Button type="submit" variant="primary" className="chat-button">
                Send <AiOutlineSend />
              </Button>
            </form>
          </div>
        </div>
        {this.props.user.name === this.props.currentArtist.name ? (
          <Button
            type="button"
            className="start-button"
            variant="success"
            onClick={this.props.startGame}
            size="lg"
            block
          >
            <span className="start-game">S T A R T G A M E !</span>
          </Button>
        ) : null}
      </div>
    )
  }
}
