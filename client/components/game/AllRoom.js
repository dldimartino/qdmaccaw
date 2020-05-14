import React from 'react'
import {Link} from 'react-router-dom'

export const AllRoom = (props) => {
  const {playerId} = props
  return props.selectedRoom.length ? (
    <div>
      {props.selectedRoom.map((room) => {
        return (
          <Link
            to={`/play/${room.id}`}
            key={room.id}
            onClick={() => props.addUserToRoom(playerId, room.id)}
          >
            <div>
              <span>{room.name}</span>
              {/* add # of players in room w/ association ternary to say "full" if no empty spaces left*/}
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
