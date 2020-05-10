import React from 'react'

export const AllPlayers = props => {
  return props.allUsers.length > 0 ? (
    <div>
      {props.allUsers.map(user => {
        return <p key={user.id}>{user.name}</p>
      })}
    </div>
  ) : (
    <div>
      <h1>No Players</h1>
    </div>
  )
}
