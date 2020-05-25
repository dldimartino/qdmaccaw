import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {AllRooms} from './AllRooms'
import {fetchRoom, filterRoom, roomAddUser} from '../store/allRoom'
import {Button, Row, Container, Col, Form} from 'react-bootstrap'

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
      this.props.history.push(`/lobby/${this.props.selectedRoom[0].id}`)
    }
  }

  componentDidMount() {
    this.props.fetchRoom()
  }

  render() {
    return (
      <Container className="Buttons">
        <Row className="justify-content-md-center">
          <h1 className="Welcome">DrawBit</h1>
        </Row>

        <form>
          <Row className="justify-content-md-center mb-3">
            <Col xs={5} sm={5} lg={4}>
              <Button
                href="/home"
                variant="danger"
                size="lg"
                className="shadow-lg fontColor"
                block
              >
                Back
              </Button>
              {/* </Link> */}
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col xs={5} sm={5} lg={4}>
              {/* <label htmlFor="search">Search Room:</label> */}
              <Form.Control
                type="search"
                name="search"
                placeholder="Search Room"
                value={this.state.search}
                onChange={this.handleChange}
                onKeyDown={this.handleKey}
              />
            </Col>
          </Row>
        </form>
        <Row className="justify-content-md-center">
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
