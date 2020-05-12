import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {newRoom} from '../../store/allRoom'

export class Create extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
      // round: '',
      // timer: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    this.props.newRoom({name: this.state.name})
    // this.setState({
    //   name: ''
    // })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    this.props.allRoom.length > 0 &&
      this.props.history.push(
        `/play/${this.props.allRoom[this.props.allRoom.length - 1].id}`
      )
    return (
      <div>
        <Link to="/">
          <button type="button">Home</button>
        </Link>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          {/* <label htmlFor="round">Round:</label>
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
          /> */}
          <br />
          <button type="submit">Start Game</button>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  allRoom: state.allRoom.allRoom
})

const mapDispatch = dispatch => ({
  newRoom: room => dispatch(newRoom(room))
})

export default connect(mapState, mapDispatch)(Create)
