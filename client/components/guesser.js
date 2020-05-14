import React, {Component, createRef} from 'react'
import io from 'socket.io-client'
import CanvasDraw from 'react-canvas-draw'
import {Col, Row, Container} from 'react-bootstrap'
import axios from 'axios'
import {updateWinner} from '../store/allUsers'
import {findRandomWord} from '../store/word'
import {connect} from 'react-redux'
const canvas = createRef()

class Guesser extends Component {
  constructor() {
    super()

    this.state = {
      playerId: 1,
      guess: '',
      gameWord: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    // console.log("PROPS ------>", this.props)
    // const gameWord = await this.props.findRandomWord()
    await this.props.findRandomWord()
    // console.log("gameWord --------->>>>>>>> ", gameWord)
    // this.setState({word: gameWord})
    await this.setState({gameWord: this.props.word})
    // console.log("THIS.STATE.WORD --------->>>>>>>> ", this.state.word)
    const socket = io.connect(window.location.origin)
    socket.on('drawing', function(data) {
      canvas.current.loadSaveData(data, true)
    })
  }

  // async markAsCorrect(playerId) {
  //   const {data} = await axios.put(`/api/user/${playerId}/winner`)
  //   console.log('a winner is found! here is the axios data', data)
  //   //await put route to make player show as "winner" on user model
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    if (this.state.guess === this.state.gameWord) {
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
    console.log('state', this.state)
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
        </form>
        <br />
        <br />
        <Container className="whiteboard">
      <Row className="justify-content-md-center">
        <h1 className="draw-word">Guess the drawing!</h1>
      </Row>
      <Row id="canvas" className="justify-content-md-center">
       <CanvasDraw ref={canvas} disabled={true} hideInterface={true} hideGrid={true}
          canvasHeight={window.innerHeight / 1.5} canvasWidth={window.innerWidth} />
      </Row>
    </Container>      
    </div>
    )
  }
}

const mapStateToProps = state => ({
  word: state.word
})

const mapDispatchToProps = dispatch => ({
  updateWinner: playerId => dispatch(updateWinner(playerId)),
  findRandomWord: () => dispatch(findRandomWord())
})

export default connect(mapStateToProps, mapDispatchToProps)(Guesser)
