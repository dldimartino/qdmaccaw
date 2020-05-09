import React, {Component} from 'react'
import CanvasDraw from 'react-canvas-draw'

export default class ReactWhiteboard extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <CanvasDraw />
      </div>
    )
  }
}
