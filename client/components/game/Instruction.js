import React from 'react'
import {Link} from 'react-router-dom'

export const Instruction = () => {
  return (
    <div>
      <Link to="/">
        <button type="button">Home</button>
      </Link>
      <p>
        When its your turn to draw, you will have to choose a word from three
        options and visualize that word in 80 seconds, alternatively when
        somebody else is drawing you have to type your guess into the chat to
        gain points, be quick, the earlier you guess a word the more points you
        get!
      </p>
      <Link to="/">
        <button type="button">Home</button>
      </Link>
    </div>
  )
}
