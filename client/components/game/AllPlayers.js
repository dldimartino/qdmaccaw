import React from 'react'

export const AllPlayers = props => {
  return props.allUsers.length > 0 ? (
    <div>
      {props.allUsers.map(user => {
        return (
          <div key={user.id}>
            <p>User: {user.name}</p>
          </div>
        )
      })}
    </div>
  ) : (
    <div>
      <h1>No Players</h1>
    </div>
  )
}
