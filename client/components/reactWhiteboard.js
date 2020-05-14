import React, {useState, createRef} from 'react'
import CanvasDraw from 'react-canvas-draw'
import io from 'socket.io-client'
import {Col, Row, Container, Button, Collapse} from 'react-bootstrap'
import {DropletFill, XSquare} from 'react-bootstrap-icons'

export default function ReactWhiteboard() {
  const [color, setColor] = useState('#AAB7B8')
  const [open, setOpen] = useState(false)
  const [radius, setRadius] = useState(12)
  const socket = io.connect(window.location.origin)
  const canvas = createRef()

  function handleChange(event) {
    socket.emit('drawing', event.getSaveData())
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="drawWord">Your Word Is: _____</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col id="canvas" md={11}>
          <CanvasDraw
            ref={canvas}
            onChange={handleChange}
            hideInterface={true}
            hideGrid={true}
            brushColor={color}
            brushRadius={radius}
            canvasHeight={window.innerHeight / 1.5}
            canvasWidth={window.innerWidth / 1.25}
          />
        </Col>
        <Col md={1}>
          <div>
            <Button
              className="btn-dark"
              onClick={() => setOpen(!open)}
              aria-controls="collapse-buttons"
              aria-expanded={open}
            >
              <DropletFill color={color} size={40} />
            </Button>
            <Collapse in={open}>
              <div id="collapse-buttons">
                <Button
                  className="palette"
                  type="button"
                  style={{backgroundColor: '#AAB7B8'}}
                  onClick={(event) =>
                    setColor(event.target.style.backgroundColor)
                  }
                />
                <Button
                  className="palette"
                  type="button"
                  style={{backgroundColor: 'red'}}
                  onClick={(event) =>
                    setColor(event.target.style.backgroundColor)
                  }
                />
                <Button
                  className="palette"
                  type="button"
                  style={{backgroundColor: 'blue'}}
                  onClick={(event) =>
                    setColor(event.target.style.backgroundColor)
                  }
                />
                <Button
                  className="palette"
                  type="button"
                  style={{backgroundColor: 'green'}}
                  onClick={(event) =>
                    setColor(event.target.style.backgroundColor)
                  }
                />
              </div>
            </Collapse>
            <Button className="btn-dark">
              <XSquare onClick={() => setColor('white')} />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
