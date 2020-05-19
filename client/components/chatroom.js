import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

export default class Chatroom extends Component {
  constructor(props, context) {
    super(props, context)
    const {chatHistory} = props
    this.state = {
      chatHistory,
      input: '',
    }
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
            <div className="message">
              <p className="meta">
                Jared <span>9:12pm</span>
              </p>
              <p className="text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, repudiandae.
              </p>
            </div>
            <div className="message">
              <p className="meta">
                DanD <span>9:15pm</span>
              </p>
              <p className="text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, repudiandae.
              </p>
            </div>
          </div>
        </main>
        <div className="chat-form-container">
          <form id="chat-form">
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
              autoComplete="off"
            />
            <Button variant="outline-success">Send</Button>{' '}
          </form>
        </div>
      </div>
    )
  }
}
