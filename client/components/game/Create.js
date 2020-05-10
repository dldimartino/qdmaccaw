import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Create extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      round: '',
      timer: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <label htmlFor="round">Round:</label>
          <input
            type="text"
            name="round"
            defaultValue={3}
            onChange={this.handleChange}
          />

          <label htmlFor="timer">Timer:</label>
          <input
            type="text"
            name="timer"
            defaultValue={80}
            onChange={this.handleChange}
          />
          <Link to="/play">
            <button type="button">Start Game</button>
          </Link>
        </form>
      </div>
    )
  }
}
