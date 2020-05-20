import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AllRooms} from './AllRooms'
import {fetchRoom, filterRoom, roomAddUser} from '../../store/allRoom'
import {Button, Row, Container} from 'react-bootstrap'

export class FindRoom extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKey = this.handleKey.bind(this)
    this.addUserToRoom = this.addUserToRoom.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
    this.props.filterRoom(event.target.value)
  }

  addUserToRoom(roomId) {
    this.props.roomAddUser(roomId, this.props.userId)
  }

  handleKey(event) {
    if (
      event.key === 'Enter' &&
      this.props.selectedRoom[0].name === event.target.value
    ) {
      this.props.roomAddUser(this.props.selectedRoom[0].id, this.props.userId)
      console.log('third')
      this.props.history.push(`/play/${this.props.selectedRoom[0].id}`)
    }
  }

  componentDidMount() {
    this.props.fetchRoom()
  }

  render() {
    return (
      <Container className="Buttons">
        <Row className="justify-content-md-center ">
          <h1 className="Welcome">DrawBit</h1>
        </Row>
        <div className="mb-3">
          <Row className="justify-content-md-center ">
            <Link to="/main">
              <Button variant="danger" size="lg" className="shadow-lg">
                Back
              </Button>
            </Link>
          </Row>
        </div>
        <Row className="justify-content-md-center ">
          <form>
            {/* <label htmlFor="search">Search Room:</label> */}
            <input
              type="search"
              name="search"
              placeholder="Search Room"
              value={this.state.search}
              onChange={this.handleChange}
              onKeyDown={this.handleKey}
            />
          </form>
        </Row>
        <Row className="justify-content-md-center ">
          <AllRooms
            selectedRoom={this.props.selectedRoom}
            addUserToRoom={this.addUserToRoom}
          />
        </Row>
      </Container>
    )
  }
}

const mapState = (state) => ({
  allRoom: state.allRoom.allRoom,
  selectedRoom: state.allRoom.selectedRoom,
  userId: state.user.id,
})

const mapDispatch = (dispatch) => ({
  fetchRoom: () => {
    dispatch(fetchRoom())
  },
  filterRoom: (value) => {
    dispatch(filterRoom(value))
  },
  roomAddUser: (roomId, userId) => {
    dispatch(roomAddUser(roomId, userId))
  },
})

export default connect(mapState, mapDispatch)(FindRoom)
