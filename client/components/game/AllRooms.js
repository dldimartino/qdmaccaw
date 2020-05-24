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
          <Row className="justify-content-md-center" key={room.id}>
            <h4 onClick={() => navigator(room)}>{room.name}</h4>
          </Row>
        )
      })}
    </div>
  ) : (
    <div>
      <h1>There Is No Room Available!</h1>
    </div>
  )
}
