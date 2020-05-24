import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
// import {Redirect} from 'react-router'
import {me} from '../store/user'
import {connect} from 'react-redux'
import {Button, Row, Container} from 'react-bootstrap'
import {newRoom} from '../store/allRoom'
import Axios from 'axios'

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
        <Row className="justify-content-md-center ">
          <h1 className="Welcome">DrawBit</h1>
        </Row>
        <div className="mb-4">
          <Row className="justify-content-md-center ">
            <Link to="/home">
              <Button variant="danger" size="lg" className="shadow-lg">
                Back
              </Button>
            </Link>
          </Row>
        </div>
        <Row className="justify-content-md-center ">
          <form onSubmit={this.handleSubmit}>
            {/* <label htmlFor="name">Name:</label> */}
            <input
              type="text"
              name="name"
              placeholder="Room Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <br />
            <Row className="justify-content-md-center ">
              <Button type="submit" className="mt-2" variant="primary">
                Create
              </Button>
            </Row>
          </form>
        </Row>
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
