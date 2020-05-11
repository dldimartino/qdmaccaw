import React, {createRef} from 'react'
import CanvasDraw from 'react-canvas-draw'
import io from 'socket.io-client'

export default function ReactWhiteboard(props) {
  const socket = io.connect(window.location.origin)
  const canvas = createRef()

  function handleChange(event) {
    console.log('Sending Drawing')
    socket.to(props.room).emit('drawing', event.getSaveData())
  }

  return (
    <div>
      <h1>Draw the word!</h1>
      <div>
        <CanvasDraw ref={canvas} onChange={handleChange} />
      </div>
    </div>
  )
}
