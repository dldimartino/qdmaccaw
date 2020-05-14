import React, {useState, createRef} from 'react'
import CanvasDraw from 'react-canvas-draw'
import io from 'socket.io-client'
import {Col, Row, Container, Button, Collapse} from 'react-bootstrap'
import {DropletFill, XSquare, Brush, Dash, Plus} from 'react-bootstrap-icons'

export default function ReactWhiteboard() {
  const [color, setColor] = useState('#AAB7B8')
  const [openPalette, setOpenPalette] = useState(false)
  const [openRadius, setOpenRadius] = useState(false)
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
              onClick={() => setOpenPalette(!openPalette)}
              aria-controls="collapse-palette"
              aria-expanded={openPalette}
            >
              <DropletFill color={color} size={30} />
            </Button>
            <Collapse in={openPalette}>
              <div id="collapse-palette">
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
            <Button className="btn-dark" onClick={() => setColor('white')}>
              <XSquare className="icon" size={30} />
            </Button>
            <Button
              className="btn-dark"
              onClick={() => setOpenRadius(!openRadius)}
              aria-controls="collapse-radius"
              aria-expanded={openRadius}
            >
              <Brush size={30} />
            </Button>
            <Collapse in={openRadius}>
              <div id="collapse-radius">
                <Button
                  className="palette"
                  type="button"
                  onClick={() => setRadius(radius + 2)}
                >
                  <Plus className="icon" size={30} />
                </Button>
                <Button
                  className="palette"
                  type="button"
                  onClick={() => setRadius(radius - 2)}
                >
                  <Dash className="icon" size={30} />
                </Button>
              </div>
            </Collapse>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
