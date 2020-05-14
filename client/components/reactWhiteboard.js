import React, {createRef} from 'react'
import CanvasDraw from 'react-canvas-draw'
import io from 'socket.io-client'
import {Guesser} from './guesser'

export default function ReactWhiteboard() {
  console.log(<Guesser.props></Guesser.props>)
  const socket = io.connect(window.location.origin)
  console.log('socketSOCKET!!!! io.connect(window.location.origin)', socket)
  const canvas = createRef()

  function handleChange(event) {
    console.log('Sending Drawing')
    socket.emit('drawing', event.getSaveData())
  }

  return (
    <div>
      <h1>Draw the word!</h1>
      <h1> this.props.word</h1>
      <div>
        <CanvasDraw ref={canvas} onChange={handleChange} />
      </div>
    </div>
  )
}
