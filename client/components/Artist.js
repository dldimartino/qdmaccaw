import React, {useState, createRef, useEffect} from 'react'
import CanvasDraw from 'react-canvas-draw'
import {Col, Row, Container, Button, Collapse} from 'react-bootstrap'
import {DropletFill, XSquare, Brush, Dash, Plus} from 'react-bootstrap-icons'
import {InlineIcon} from '@iconify/react'
import eraserIcon from '@iconify/icons-mdi/eraser'
import contrastIcon from '@iconify/icons-mdi/contrast'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router'
const canvas = createRef()
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

function Artist(props) {
  const [color, setColor] = useState('#404040')
  const [openPalette, setOpenPalette] = useState(false)
  const [openRadius, setOpenRadius] = useState(false)
  const [radius, setRadius] = useState(12)
  const [timer, setTimer] = useState(60)
  const history = useHistory()

  function handleChange(event) {
    props.socket.emit('drawing', event.getSaveData(), props.room.name)
  }

  function handleClear() {
    canvas.current.clear()
    props.socket.emit('clear', props.room.name)
  }

  useEffect(() => {
    let time = 60
    setInterval(() => {
      time--
      if (time === 0) {
        history.push({
          pathname: `/lobby/${props.room.id}`,
          state: {lobby: props.room},
        })
      } else if (time > -1) {
        setTimer(time)
      }
    }, 1000)

    //LISTENS FOR A GUESS
    props.socket.on('got_guess', (guess) => {
      if (guess.guess.toLowerCase() === props.word) {
        props.notifyCorrect()
      } else {
        props.notifyIncorrect()
      }
    })
  }, [])

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={4}>
          <h1 className="timer"> Time: {timer} </h1>
        </Col>
      </Row>
      <Row>
        <h1 className="draw-word">Your Word Is: {props.word}</h1>
        <Col className="draw-buttons" md={4}>
          <div>
            <Button
              className="btn-dark"
              onClick={() => {
                setOpenPalette(!openPalette)
                if (openRadius) setOpenRadius(!openRadius)
              }}
              aria-controls="collapse-palette"
              aria-expanded={openPalette}
            >
              <DropletFill color="#ffffff" size={30} />
            </Button>
            <Collapse in={openPalette}>
              <div id="collapse-palette">
                <Button
                  className="palette"
                  type="button"
                  style={{backgroundColor: '#404040'}}
                  onClick={(event) =>
                    setColor(event.target.style.backgroundColor)
                  }
                  active
                />
                <Button
                  className="palette"
                  type="button"
                  style={{backgroundColor: '#ff3333'}}
                  onClick={(event) =>
                    setColor(event.target.style.backgroundColor)
                  }
                  active
                />
                <Button
                  className="palette"
                  type="button"
                  style={{backgroundColor: '#3366ff'}}
                  onClick={(event) =>
                    setColor(event.target.style.backgroundColor)
                  }
                  active
                />
                <Button
                  className="palette"
                  type="button"
                  style={{backgroundColor: '#ffff33'}}
                  onClick={(event) =>
                    setColor(event.target.style.backgroundColor)
                  }
                  active
                />
                <Button
                  className="palette"
                  type="button"
                  style={{backgroundColor: '#40bf40'}}
                  onClick={(event) =>
                    setColor(event.target.style.backgroundColor)
                  }
                  active
                />
              </div>
            </Collapse>
            <Button
              className="btn-dark"
              onClick={() => {
                setOpenRadius(!openRadius)
                if (openPalette) setOpenPalette(!openPalette)
              }}
              aria-controls="collapse-radius"
              aria-expanded={openRadius}
            >
              <InlineIcon icon={contrastIcon} height="2em" width="2em" />
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
            <Button className="btn-dark" onClick={() => setColor('white')}>
              <InlineIcon icon={eraserIcon} height="2em" width="2em" />
            </Button>
            <Button className="btn-dark" onClick={handleClear}>
              <XSquare className="icon" size={30} />
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <CanvasDraw
          id="canvas"
          className="justify-content-center"
          ref={canvas}
          onChange={handleChange}
          hideInterface={true}
          hideGrid={true}
          brushColor={color}
          brushRadius={radius}
          lazyRadius={0}
        />
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  allWords: state.word,
})

const mapDispatchToProps = () => ({
  notifyCorrect: () =>
    toast.success('A user has guessed correctly!', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    }),
  notifyIncorrect: () =>
    toast.error('A user has guessed incorrectly!', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    }),
})
export default connect(mapStateToProps, mapDispatchToProps)(Artist)
