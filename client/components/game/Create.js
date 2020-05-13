import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {newRoom} from '../../store/allRoom'

export class Create extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.newRoom({name: this.state.name})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  componentDidUpdate() {
    this.props.allRoom.length > 0 &&
      this.props.history.push(
        `/play/${this.props.allRoom[this.props.allRoom.length - 1].id}`
      )
  }

  render() {
    return (
      <div>
        <Link to="/main">
          <button type="button">Back</button>
        </Link>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <br />
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => ({
  allRoom: state.allRoom.allRoom,
})

const mapDispatch = (dispatch) => ({
  newRoom: (room) => dispatch(newRoom(room)),
})

export default connect(mapState, mapDispatch)(Create)
