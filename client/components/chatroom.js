import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import io from 'socket.io-client'
const moment = require('moment')
import {AiFillWechat, AiOutlineSend} from 'react-icons/ai'

const socket = io.connect(window.location.origin)

export default class Chatroom extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      console.log('MESSAGE RECEIVED', message)
      this.setState((prevState) => {
        const {messages} = prevState
        messages.push(message)
        return messages
      })
    })

    //server sends a message
    socket.on('chat_joined', (message) => {
      console.log('MESSAGE RECEIVED', message)
      this.setState((prevState) => {
        const {messages} = prevState
        messages.push(message)
        return messages
      })
    })

    // LATE JOIN
    // if (this.props.user.isArtist) {
    //   socket.on('join_lobby_late', (user) => {
    //     console.log('USER', user)
    //     socket.emit('word_generate', this.state.gameWord, this.state.room.name)
    //   })
    // }
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
    console.log(this.state.messages)
    console.log(this.props)
    return (
      <div className="chat-container">
        <header className="chat-header">
          <h1>
            <i>
              <AiFillWechat /> Chat
            </i>
          </h1>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3>Current Artist:</h3>
            <h2 id="artist-name">Jared</h2>
            <h3>Users:</h3>
            {/* {this.props.users.allUsers.map((user) => ( */}
            <ul id="users">
              <li>Test</li>
            </ul>
            {/* ))} */}
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
            <input
              name="message"
              type="text"
              placeholder="Enter Message"
              value={this.state.message}
              onChange={this.handleChange}
            />
            <Button type="submit" variant="outline-success">
              Send <AiOutlineSend />
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
