import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

export default class Chatroom extends Component {
  constructor() {
    super()
    this.state = {
      message: '',
      messages: ['test', 'jared'],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  //Refactor with use-effect to work with socket.
  //   useEffect(() => {
  //     socket.emit('chat_message'), 'message')
  //     return () => {
  //       console.log('WHITEBOARD LEFT')
  //       socket.emit('leave_room', props.room.name)
  //     }
  //   }, [])

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    //socket emit goes here
    event.preventDefault()
    console.log('THIS IS THE EVENT', event)
  }

  render() {
    return (
      <div className="chat-container">
        <header className="chat-header">
          <h1>
            <i className="fas fa-smile">Chat</i>
          </h1>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3>
              <i>Current Artist:</i>
            </h3>
            <h2 id="artist-name">Jared</h2>
            <h3>
              <i>Users</i>
            </h3>
            <ul id="users">
              <li>Jared</li>
              <li>Cesar</li>
              <li>DanD</li>
              <li>DanS</li>
            </ul>
          </div>
          <div className="chat-messages">
            {this.state.messages.map((message, index) => (
              <div className="message" key={index}>
                <p className="meta">DanD</p>
                <p className="text">{message}</p>
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
              Send
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
