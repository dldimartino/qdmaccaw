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
    }, 2000)
  }

  return props.selectedRoom.length ? (
    <div>
      {props.selectedRoom.map((room) => {
        return (
          <h4 key={room.id} onClick={() => navigator(room)}>
            {room.name}
          </h4>
          //   {/* to={{
          //     pathname: `/lobby/${room.id}`,
          //     state: {
          //       lobby: room,
          //     },
          //   }}
          //   key={room.id}
          //   onClick={() => props.addUserToRoom(room.id)}
          //   className="link"
          // >
          //   <div>
          //     <span>{room.name}</span>
          //   </div> */}
        )
      })}
    </div>
  ) : (
    <div>
      <h1>There Is No Room Available!</h1>
    </div>
  )
}
