import React, {createRef} from 'react'
import io from 'socket.io-client'
import CanvasDraw from 'react-canvas-draw'
import {Col, Row, Container} from 'react-bootstrap'

export default function Guesser() {
  const socket = io.connect(window.location.origin)
  const canvas = createRef()

  socket.on('drawing', function (data) {
    canvas.current.loadSaveData(data, true)
  })

  // prettier-ignore
  return (
    <Container className="whiteboard">
      <Row className="justify-content-md-center">
        <h1 className="draw-word">Guess the drawing!</h1>
      </Row>
      <Row id="canvas" className="justify-content-md-center">
       <CanvasDraw ref={canvas} disabled={true} hideInterface={true} hideGrid={true}
          canvasHeight={window.innerHeight / 1.5} canvasWidth={window.innerWidth} />
      </Row>
    </Container>
  )
}
