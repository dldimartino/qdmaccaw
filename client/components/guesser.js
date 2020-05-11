import React, {useRef} from 'react'
import io from 'socket.io-client'
import CanvasDraw from 'react-canvas-draw'

export default function Guesser() {
  const socket = io.connect(window.location.origin)
  const canvas = useRef()

  socket.on('drawing', function (data) {
    canvas.current.loadSaveData(data, true)
  })

  return (
    <div>
      <h1>Guess the drawing!</h1>
      <CanvasDraw ref={canvas} disabled={true} />
    </div>
  )
}
