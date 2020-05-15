import React, {Component, createRef} from 'react'
import io from 'socket.io-client'
import CanvasDraw from 'react-canvas-draw'
import {Col, Row, Container} from 'react-bootstrap'
import {updateWinner} from '../store/allUsers'
import {connect} from 'react-redux'
const canvas = createRef()
const socket = io.connect(window.location.origin)

class Guesser extends Component {
  constructor() {
    super()
    this.state = {
      playerId: 1,
      guess: '',
      gameWord: [],
      rounds: 10,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  // wordsForGame = (rounds, wordArry) => {
  //   let words = []
  //   while (words.length < rounds) {
  //     let word = wordArry[Math.floor(Math.random() * (100 - 1)) + 1].content
  //     if (!words.includes(word)) {
  //       words.push(word)
  //     }
  //   }
  //   console.log(words)
  // }

  handleOnClick(rounds, wordArray) {
    this.setState({gameWord: []})
    while (this.state.gameWord.length < rounds) {
      let word = wordArray[Math.floor(Math.random() * (100 - 1)) + 1].content
      if (!this.state.gameWord.includes(word)) {
        this.state.gameWord.push(word)
      }
    }
    console.log(this.state.gameWord)
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
    if (this.state.gameWord.includes(this.state.guess)) {
      await this.props.updateWinner(this.state.playerId)
      console.log(this.state.guess)
      await console.log('YOU WON!!!')
    } else {
      console.log('GUESS AGAIN!!!')
      console.log('you guessed', this.state.guess)
      console.log('word was', this.state.gameWord)
      await this.setState({guess: ''})
      console.log(`this.state.guess (your guess)
        has been reset to, " ${this.state.guess}"`)
    }
  }

  render() {
    let {word} = this.props
    return (
      <div>
        <h1>Guess the drawing!</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="guess">Guess:</label>
          <input
            type="text"
            name="guess"
            value={this.state.guess}
            onChange={this.handleChange}
          />
          <button type="submit">Submit Guess</button>
          <button
            type="button"
            onClick={() => this.handleOnClick(this.state.rounds, word)}
          >
            {' '}
            Generate Word{' '}
          </button>
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
