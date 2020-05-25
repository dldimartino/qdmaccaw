import React from 'react'
// import {Link} from 'react-router-dom'
import {useHistory} from 'react-router'
import {Row} from 'react-bootstrap'

export const AllRooms = (props) => {
  const history = useHistory()
  const navigator = (room) => {
    props.addUserToRoom(room.id)
    setTimeout(() => {
      history.push({
        pathname: `/lobby/${room.id}`,
        state: {lobby: room},
      })
    }, 0)
  }

  return props.selectedRoom.length ? (
    <div>
      {props.selectedRoom.map((room) => {
        return (
          <Row className="justify-content-center" key={room.id}>
            <a href="#">
              <h4 className="room-link" onClick={() => navigator(room)}>
                {room.name}
              </h4>
            </a>
          </Row>
        )
      })}
    </div>
  ) : (
    <div>
      <Row className="justify-content-center">
        <h1>There Is No Room Available!</h1>
      </Row>
    </div>
  )
}
