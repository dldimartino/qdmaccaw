import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Skribbl 2.0</h1>
      <Link to="/room">
        <button type="button">Join Room!</button>
      </Link>
      <Link to="/create">
        <button type="button">Create Room!</button>
      </Link>

      <h2>How to Play</h2>
      <p>
        When its your turn to draw, you will have to choose a word from three
        options and visualize that word in 80 seconds, alternatively when
        somebody else is drawing you have to type your guess into the chat to
        gain points, be quick, the earlier you guess a word the more points you
        get!
      </p>
    </div>
  )
}

export default Home
