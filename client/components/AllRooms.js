import React from 'react'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router'

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
          <a href="#" key={room.id}>
            <h4
              key={room.id}
              className="room-link"
              onClick={() => navigator(room)}
            >
              {room.name}
            </h4>
          </a>
        )
      })}
    </div>
  ) : (
    <div>
      <h1>There Is No Room Available!</h1>
    </div>
  )
}
