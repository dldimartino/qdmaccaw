import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
// import {Redirect} from 'react-router'
import {me} from '../store/user'
import {connect} from 'react-redux'
import {Button, Row, Container, Col, Form} from 'react-bootstrap'
import {newRoom, roomAddUser} from '../store/allRoom'
import Axios from 'axios'
import io from 'socket.io-client'
const socket = io.connect(window.location.origin)

export class CreateLobby extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const {data} = await Axios.post('/api/room', {name: this.state.name})
    // await this.props.newRoom({name: this.state.name})
    const artistYay = await Axios.put(
      `/api/users/setAsArtist/${this.props.user.id}/true`
    )

    ////////// DanD - I added a dispatch to run the me() function to re-grab the new user from the db
    await this.props.getUser()
    this.props.roomAddUser(data.id, this.props.user.id)
    const toLobby = () => {
      return this.props.history.push({
        pathname: `/lobby/${data.id}`,
        state: {lobby: data},
      })
    }
    if (data) {
      this.setState({name: 'Room Generating!'})
      socket.emit('room_update')
      setTimeout(toLobby, 800)
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <Container className="Buttons">
        <Row className="justify-content-center">
          <h1 className="Welcome">DrawBit</h1>
        </Row>

        <form onSubmit={this.handleSubmit}>
          <Row className="justify-content-center mb-4">
            <Col xs={6} sm={5} lg={4}>
              <Link to="/home">
                <Button variant="danger" size="lg" className="shadow-lg" block>
                  Back
                </Button>
              </Link>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={6} sm={5} lg={4}>
              {/* <label htmlFor="name">Name:</label> */}
              <Form.Control
                type="text"
                name="name"
                placeholder="Room Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={6} sm={5} lg={4}>
              <Button
                type="submit"
                className="mt-2"
                variant="primary"
                size="lg"
                block
              >
                Create
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    )
  }
}

const mapState = (state) => ({
  allRoom: state.allRoom.allRoom,
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  newRoom: (room) => dispatch(newRoom(room)),

  ////// added for me() to regrab the updated user after set to artist
  getUser: () => dispatch(me()),
  roomAddUser: (roomId, userId) => {
    dispatch(roomAddUser(roomId, userId))
  },
})

export default connect(mapState, mapDispatch)(CreateLobby)
