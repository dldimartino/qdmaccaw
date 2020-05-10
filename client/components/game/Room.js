import React, {Component} from 'react'
import {AllRoom} from './AllRoom'
import {connect} from 'react-redux'
import {fetchRoom} from '../../store/allRoom'

export class Room extends Component {
  constructor() {
    super()
    this.state = {}
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
          <input type="search" name="search" />
        </form>

        <AllRoom allRoom={this.props.allRoom} />
      </div>
    )
  }
}

const mapState = state => ({
  allRoom: state.allRoom
})

const mapDispatch = dispatch => ({
  fetchRoom: () => {
    dispatch(fetchRoom())
  }
})

export default connect(mapState, mapDispatch)(Room)
