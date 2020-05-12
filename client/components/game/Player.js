import React from 'react'

export const Player = props => {
  return (
    <div>
      <img src={props.user.imageUrl} />
      <span>{props.user.name}</span>
    </div>
  )
}
