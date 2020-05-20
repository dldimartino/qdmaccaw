import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
// import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import {Button, Row, Container} from 'react-bootstrap'
import {newRoom} from '../../store/allRoom'
import Axios from 'axios'

export class Create extends Component {
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
    await Axios.put(`/api/users/setAsArtist/${this.props.user.id}/true`)
    console.log('DATA ------->>>>>>>>>>', data)
    if (data) {
      this.props.history.push({
        pathname: `/lobby/${data.id}`,
        state: {lobby: data},
      })
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
            <Link to="/main">
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
})

export default connect(mapState, mapDispatch)(Create)
