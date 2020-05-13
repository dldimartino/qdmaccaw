import React from 'react'
import {Link} from 'react-router-dom'

export const Instruction = () => {
  return (
    <div>
      <Link to="/main">
        <button type="button">Back</button>
      </Link>

      <h3>Rules</h3>
      <h4>Picturist</h4>
      <ol>
        <li>There's 1 Picturist a round</li>
        <li>You will receive a word to draw</li>
        <li>You have 30 second to draw it</li>
      </ol>
      <h4>Guesser</h4>
      <ol>
        <li>You have 30 second to guess</li>
        <li>You only have 1 try to guess</li>
      </ol>
      <h4>Points</h4>
      <ol>
        <li>The earlier you guess, the more points you receive</li>
        <li>Picturist will receive 1 point for each guess</li>
        <li>Picturist will receieve 2x points if all guess</li>
        <li>First to guess will multiply time left x3</li>
        <li>Second to guess will multiply time left x2.5</li>
        <li>Third to guess will multiply time left x2</li>
        <li>Everyone else will receive points based on time</li>
      </ol>

      <Link to="/main">
        <button type="button">Back</button>
      </Link>
    </div>
  )
}
