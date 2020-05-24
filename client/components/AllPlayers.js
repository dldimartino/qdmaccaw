import React from 'react'

export const AllPlayers = (props) => {
  return props.inRoom.length ? (
    <div>
      {props.inRoom.map((user) => {
        return (
          <div key={user.id}>
            <div className="userCards">
              <img src={`${user.imageUrl}`} className="avatarImg" />

              <span className="userData">
                <span>User: {user.name}</span>
                <span>
                  Wins/Games Played: {user.wins}/{user.gamesPlayed}
                </span>
                <span>MunnyPoints: {user.munnyPoints}</span>
              </span>
            </div>
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
