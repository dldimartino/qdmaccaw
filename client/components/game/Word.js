import React from 'react'

export const Word = props => {
  return (
    <div>
      {props.allWords.map(word => {
        return (
          <div key={word.id}>
            <p>{word.content}</p>
            <p>{word.category}</p>
          </div>
        )
      })}
    </div>
  )
}
