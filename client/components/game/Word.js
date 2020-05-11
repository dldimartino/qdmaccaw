import React from 'react'

export const Word = props => {
  return (
    <div>
      {props.allWords.map(word => {
        return (
          <div key={word.id}>
            <p>
              Word: {word.content}, Category: {word.category}
            </p>
          </div>
        )
      })}
    </div>
  )
}
