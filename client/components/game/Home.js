import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div>
        <h1>Skribbl 2.0</h1>
        <Link to="/play">
          <button type="button">Play!</button>
        </Link>
        <Link to="/create">
          <button type="button">Create Private Room</button>
        </Link>

        <h2>How to Play</h2>
        <p>
          When its your turn to draw, you will have to choose a word from three
          options and visualize that word in 80 seconds, alternatively when
          somebody else is drawing you have to type your guess into the chat to
          gain points, be quick, the earlier you guess a word the more points
          you get!
        </p>
      </div>
    )
  }
}
