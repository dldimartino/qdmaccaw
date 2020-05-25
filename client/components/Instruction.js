import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Row, Container, Col} from 'react-bootstrap'

const Instruction = () => {
  return (
    <Container className="Buttons">
      <Row className="justify-content-md-center">
        <h1 className="Welcome">DrawBit</h1>
      </Row>
      <Row className="justify-content-md-center mb-4">
        {/* <Link to="/home"> */}
        <Col xs={6} sm={5} lg={4}>
          <Button
            href="/home"
            variant="danger"
            size="lg"
            className="fontColor shadow-lg"
            block
          >
            Back
          </Button>
        </Col>
        {/* </Link> */}
      </Row>
      <Row className="justify-content-md-center ">
        <div>
          <h4>
            <u>Instructions</u>
          </h4>
          <h5>Artist</h5>
          <ol>
            <li>There can only be 1 Artist</li>
            <li>Will receive a word to draw</li>
            <li>60 seconds to draw the word</li>
            <li>Has the ability to pass the brush</li>
            <li>Has the power to start the game</li>
          </ol>
          <h5>Guesser</h5>
          <ol>
            <li>Has to guess the artist's word</li>
            <li>Has 60 seconds to guess the word</li>
            <li>Has unlimited guesses</li>
            <li>Can become an artist</li>
          </ol>
          {/* <h5>Points</h5>
          <ol>
            <li>The earlier you guess, the more points you receive</li>
            <li>Picturist will receive 1 point for each guess</li>
            <li>Picturist will receieve 2x points if all guess</li>
            <li>First to guess will multiply time left x3</li>
            <li>Second to guess will multiply time left x2.5</li>
            <li>Third to guess will multiply time left x2</li>
            <li>Everyone else will receive points based on time</li>
          </ol> */}
        </div>
      </Row>
    </Container>
  )
}

export default Instruction
