import React, {useState, useEffect, createRef} from 'react'
import CanvasDraw from 'react-canvas-draw'
import io from 'socket.io-client'

export default function ReactWhiteboard() {
  const [drawing, setDrawing] = useState(null)
  const socket = io.connect('http://localhost:8080')
  const canvas = createRef()

  useEffect(() => {
    socket.on('drawing', function(data) {
      setDrawing(canvas.current.loadSaveData(data, true))
    })
  })

  function handleChange(event) {
    socket.emit('drawing', drawing)
    setDrawing(event.getSaveData())
  }

  return (
    <div>
      <h1>Hello</h1>
      <CanvasDraw ref={canvas} onChange={handleChange} />
    </div>
  )
}
