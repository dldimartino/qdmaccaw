import React, {Component} from 'react'
import AllUsers from './AllUsers'

export class Play extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div>
        <AllUsers />
      </div>
    )
  }
}
