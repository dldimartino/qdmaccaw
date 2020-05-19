import React from 'react'
import {Link} from 'react-router-dom'

export const AllRooms = (props) => {
  return props.selectedRoom.length ? (
    <div>
      {props.selectedRoom.map((room) => {
        return (
          <Link
            to={{pathname: `/lobby/${room.id}`, room: room}}
            key={room.id}
            onClick={() => props.addUserToRoom(room.id)}
            className="link"
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
      <h1>There Is No Room Available!</h1>
    </div>
  )
}
