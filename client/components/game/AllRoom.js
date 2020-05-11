import React from 'react'
import {Link} from 'react-router-dom'

export const AllRoom = props => {
  return props.selectedRoom.length > 0 ? (
    <div>
      {props.selectedRoom.map(room => {
        return (
          <Link to={`/play/${room.id}`} key={room.id}>
            <div>
              <p>{room.name}</p>
            </div>
          </Link>
        )
      })}
    </div>
  ) : (
    <div>
      <h1>There No Room Available!</h1>
    </div>
  )
}
