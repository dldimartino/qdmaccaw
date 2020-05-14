import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AllRoom} from './AllRoom'
import {fetchRoom, filterRoom} from '../../store/allRoom'

export class Room extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKey = this.handleKey.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
    this.props.filterRoom(event.target.value)
  }

  handleKey(event) {
    console.log('selectedRoom: ', this.props)
    if (
      event.key === 'Enter' &&
      this.props.selectedRoom[0].name === event.target.value
    ) {
      this.props.history.push(`/play/${this.props.selectedRoom[0].id}`)
    }
  }

  componentDidMount() {
    this.props.fetchRoom()
  }

  render() {
    return (
      <div>
        <Link to="/main">
          <button type="button">Back</button>
        </Link>
        <form>
          <label htmlFor="search">Search Room:</label>
          <input
            type="search"
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
            onKeyDown={this.handleKey}
          />
        </form>
        <AllRoom selectedRoom={this.props.selectedRoom} />
      </div>
    )
  }
}

const mapState = (state) => ({
  allRoom: state.allRoom.allRoom,
  selectedRoom: state.allRoom.selectedRoom,
})

const mapDispatch = (dispatch) => ({
  fetchRoom: () => {
    dispatch(fetchRoom())
  },
  filterRoom: (value) => {
    dispatch(filterRoom(value))
  },
})

export default connect(mapState, mapDispatch)(Room)
