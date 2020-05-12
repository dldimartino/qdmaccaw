import React, {Component, createRef} from 'react'
import io from 'socket.io-client'
import CanvasDraw from 'react-canvas-draw'

export default class Guesser extends Component {
  constructor() {
    super()

    this.state = {
      guess: '',
      word: this.props.word
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.markAsCorrect = this.markAsCorrect.bind(this)
  }

  async markAsCorrect() {
    //await put route to make player show as "won" on game model association
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    if (this.state.guess === this.state.word) {
      await this.markAsCorrect()
    }
  }

  // const socket = io.connect(window.location.origin)
  // const canvas = createRef()
  // socket.on('drawing', function (data) {
  // canvas.current.loadSaveData(data, true)
  // }

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
        </form>
        {/* <CanvasDraw ref={canvas} disabled={true} hideInterface={true} /> */}
      </div>
    )
  }
}
