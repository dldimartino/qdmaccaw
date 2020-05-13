import React, {Component, createRef} from 'react'
import io from 'socket.io-client'
import CanvasDraw from 'react-canvas-draw'
import axios from 'axios'
const canvas = createRef()

export default class Guesser extends Component {
  constructor() {
    super()

    this.state = {
      // user: this.props.user
      guess: '',
      word: 'test'
      // this.props.word
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.markAsCorrect = this.markAsCorrect.bind(this)
  }

  async markAsCorrect(userId) {
    const {data} = await axios.put(`/api/user/${userId}/winner`)
    console.log('a winner is found! here is the axios data', data)
    //await put route to make player show as "winner" on user model
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    const socket = io.connect(window.location.origin)
    socket.on('drawing', function(data) {
      canvas.current.loadSaveData(data, true)
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    if (this.state.guess === this.state.word) {
      console.log(this.state.guess)
      await console.log('YOU WON!!!')
      // await this.markAsCorrect()
    } else {
      console.log('GUESS AGAIN!!!')
      console.log('you guessed', this.state.guess)
      console.log('word was', this.state.word)
      await this.setState({guess: ''})
      console.log(
        `this.state.guess (your guess) has been reset to, " ${
          this.state.guess
        }"`
      )
    }
  }

  render() {
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
        <CanvasDraw ref={canvas} disabled={true} hideInterface={true} />
      </div>
    )
  }
}
