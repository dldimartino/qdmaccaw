import React, {Component, createRef} from 'react'
import io from 'socket.io-client'
import CanvasDraw from 'react-canvas-draw'
import {Col, Row, Container} from 'react-bootstrap'
import {updateWinner} from '../store/allUsers'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const canvas = createRef()
const socket = io.connect(window.location.origin)

class Guesser extends Component {
  constructor() {
    super()
    this.state = {
      playerId: 1,
      guess: '',
      timer: 30,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleOnClick = this.handleOnClick.bind(this)
    // this.gameTimer = this.gameTimer.bind(this)
  }

  componentDidMount() {
    socket.emit('join_room', this.props.room.name)
    console.log('GUESSER JOINING ROOM')
    socket.on('drawing', function (data) {
      console.log('GUESSER DRAWING RECEIVED')
      canvas.current.loadSaveData(data, true)
    })
  }

  componentWillUnmount() {
    console.log('GUESSER LEFT ROOM')
    socket.emit('leave_room', this.props.room.name)
  }

  // async markAsCorrect(playerId) {
  //   const {data} = await axios.put(`/api/user/${playerId}/winner`)
  //   console.log('a winner is found! here is the axios data', data)
  //   //await put route to make player show as "winner" on user model
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    if ('fullstack' === this.state.guess.toLowerCase()) {
      await this.props.updateWinner(this.state.playerId)
      console.log(this.state.guess)
      await console.log('YOU WON!!!')
      window.alert('YOU WIN!')
    } else {
      console.log('GUESS AGAIN!!!')
      window.alert('GUESS AGAIN!')
      console.log('you guessed', this.state.guess)
      console.log('word was', this.state.gameWord)
      await this.setState({guess: ''})
      console.log(`this.state.guess (your guess)
        has been reset to, " ${this.state.guess}"`)
    }
  }

  render() {
    return (
      <div>
        <Link to={`/play/${this.props.room.id}`} className="link">
          <button type="button">Back To Lobby</button>
        </Link>
        <h1> Timer: {this.state.timer} </h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="guess">Guess:</label>
          <input
            type="text"
            name="guess"
            value={this.state.guess}
            onChange={this.handleChange}
          />
          <button type="submit">Submit Guess</button>
        </form>
        <br />
        <br />
        <Container className="whiteboard">
          <Row className="justify-content-md-center">
            <h1 className="draw-word">Guess the drawing!</h1>
          </Row>
          <Row id="canvas" className="justify-content-md-center">
            <CanvasDraw
              ref={canvas}
              disabled={true}
              hideInterface={true}
              hideGrid={true}
              canvasHeight={window.innerHeight / 1.5}
              canvasWidth={window.innerWidth}
            />
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  word: state.word,
})

const mapDispatchToProps = (dispatch) => ({
  updateWinner: (playerId) => dispatch(updateWinner(playerId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Guesser)
