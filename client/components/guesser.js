import React, {Component, createRef} from 'react'
import CanvasDraw from 'react-canvas-draw'
import {Row, Container, Button, Spinner} from 'react-bootstrap'
import {updateWinner} from '../store/allUsers'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const canvas = createRef()
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

class Guesser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerId: 1,
      guess: '',
      timer: 60,
      word: props.word,
      guessStatus: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.gameTimer = this.gameTimer.bind(this)
  }

  componentDidMount() {
    // RECEIVE DRAWING LISTENER
    this.props.socket.on('drawing', function (data) {
      canvas.current.loadSaveData(data, true)
    })

    // RECEIVE CLEAR WHITEBOARD LISTENER
    this.props.socket.on('clear', () => {
      canvas.current.clear()
    })

    // START GAME TIMER
    this.gameTimer()
  }

  gameTimer() {
    let time = 60
    let countdown = setInterval(() => {
      if (this.state.timer < 0) clearInterval(countdown)
      time--
      this.setState({
        timer: time,
      })
      if (time === 0) {
        this.props.history.push({
          pathname: `/lobby/${this.props.room.id}`,
          state: {lobby: this.props.room},
        })
      }
    }, 1000)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.word === this.state.guess.toLowerCase()) {
      this.props.notifyCorrect()
      this.setState({guessStatus: true})
    } else {
      this.props.notifyIncorrect()
    }
    this.setState({guess: ''})
  }

  render() {
    return (
      <div>
        <Container className="whiteboard">
          <Row className="justify-content-center">
            <h1 className="draw-word">
              Guess What Word The Artist is Drawing!
            </h1>
          </Row>
          {this.state.guessStatus ? (
            <Container>
              <Row className="justify-content-center">
                <h3 className="roundEnd">Good Job!</h3>
              </Row>
              <Row className="justify-content-center">
                <h3 className="roundEnd">Waiting For Round To End...</h3>
              </Row>
              <Row className="justify-content-center">
                <h3 className="roundEnd">
                  <Spinner animation="border" variant="primary" />
                </h3>
              </Row>
            </Container>
          ) : (
            <div>
              <br />
              <br />
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="guess"
                  value={this.state.guess}
                  onChange={this.handleChange}
                />
                <Button type="submit">Submit Guess</Button>
              </form>
            </div>
          )}
          <Row>
            <h1 className="timer"> Time: {this.state.timer} </h1>
          </Row>
          <Row id="canvas" className="justify-content-center">
            <CanvasDraw
              ref={canvas}
              disabled={true}
              hideInterface={true}
              hideGrid={true}
              canvasHeight={window.screen.availHeight / 1.25}
              canvasWidth={window.screen.availWidth}
            />
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allWords: state.word,
})

const mapDispatchToProps = (dispatch) => ({
  updateWinner: (playerId) => dispatch(updateWinner(playerId)),
  notifyCorrect: () =>
    toast.success('Correct!', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    }),
  notifyIncorrect: () =>
    toast.error('Incorrect! Guess Again!', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Guesser)
