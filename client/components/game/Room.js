import React, {Component} from 'react'
import {AllRoom} from './AllRoom'
import {connect} from 'react-redux'
import {fetchRoom, filterRoom} from '../../store/allRoom'

export class Room extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
    // this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.filter = this.filter.bind(this)
  }

  // handleSubmit(event) {
  //   console.log('hi')
  //   event.preventDefault()
  //   const state = this.state
  //   const newCar = {
  //     brand: state.brand,
  //   }
  //   this.props.addCar(newCar)
  //   this.props.history.push('/admin')
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    this.filter(event.target.value)
  }

  filter(value) {
    this.props.filterRoom(value)
  }

  componentDidMount() {
    this.props.fetchRoom()
  }

  render() {
    console.log('props: ', this.props)

    return (
      <div>
        <form>
          <label htmlFor="search">Search Room:</label>
          <input
            type="search"
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </form>

        <AllRoom selectedRoom={this.props.selectedRoom} />
      </div>
    )
  }
}

const mapState = state => {
  console.log('state: ', state)
  return {
    allRoom: state.allRoom.allRoom,
    selectedRoom: state.allRoom.selectedRoom
  }
}

const mapDispatch = dispatch => ({
  fetchRoom: () => {
    dispatch(fetchRoom())
  },
  filterRoom: value => {
    dispatch(filterRoom(value))
  }
})

export default connect(mapState, mapDispatch)(Room)
