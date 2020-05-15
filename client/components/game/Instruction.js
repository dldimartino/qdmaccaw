import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Row, Container} from 'react-bootstrap'

const Instruction = () => {
  return (
    <Container className="Buttons">
      <Row className="justify-content-md-center ">
        <Link to="/main">
          <Button variant="danger" size="lg" className="shadow-lg">
            Back
          </Button>
        </Link>
      </Row>
      <Row className="justify-content-md-center ">
        <div>
          <h4>
            <u>Instruction</u>
          </h4>
          <h5>Picturist</h5>
          <ol>
            <li>There's 1 Picturist a round</li>
            <li>You will receive a word to draw</li>
            <li>You have 30 second to draw it</li>
          </ol>
          <h5>Guesser</h5>
          <ol>
            <li>You have 30 second to guess</li>
            <li>You only have 1 try to guess</li>
          </ol>
          <h5>Points</h5>
          <ol>
            <li>The earlier you guess, the more points you receive</li>
            <li>Picturist will receive 1 point for each guess</li>
            <li>Picturist will receieve 2x points if all guess</li>
            <li>First to guess will multiply time left x3</li>
            <li>Second to guess will multiply time left x2.5</li>
            <li>Third to guess will multiply time left x2</li>
            <li>Everyone else will receive points based on time</li>
          </ol>
        </div>
      </Row>

      <Row className="justify-content-md-center ">
        <Link to="/main">
          <Button variant="danger" size="lg" className="shadow-lg">
            Back
          </Button>
        </Link>
      </Row>
    </Container>
  )
}

export default Instruction
