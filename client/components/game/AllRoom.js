import React from 'react'

export const AllRoom = props => {
  return props.allRoom.length > 0 ? (
    <div>
      {props.allRoom.map(room => {
        return (
          <div key={room.id}>
            <p>{room.name}</p>
          </div>
        )
      })}
    </div>
  ) : (
    <div>
      <h1>There No Room Available!</h1>
    </div>
  )
}
