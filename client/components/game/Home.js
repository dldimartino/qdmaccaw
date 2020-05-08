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
        <h2>About Us</h2>
        <p>
          skribbl 2.0 is a free multiplayer drawing and guessing game. One game
          consists of a few rounds in which every round someone has to draw
          their chosen word and others have to guess it to gain points! The
          person with the most points at the end of game will then be crowned as
          the winner!
        </p>
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
