import React, {Component} from 'react'
import AllPlayers from './AllPlayers'

export default class Play extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div>
        <AllPlayers />
      </div>
    )
  }
}
