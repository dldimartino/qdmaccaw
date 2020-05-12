import React from 'react'

export const AllPlayers = props => {
  return props.allUsers.length ? (
    <div>
      {props.allUsers.map(user => {
        return (
          <div key={user.id}>
            <img src={`${user.imageUrl}`} className="avatarImg" />
            <span>User: {user.name}</span>
            <span>
              Wins/Games Played: {user.wins}/{user.gamesPlayed}
            </span>
            <span>MunnyPoints: {user.munnyPoints}</span>
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
