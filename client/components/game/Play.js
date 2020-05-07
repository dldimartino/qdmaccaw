import React, {Component} from 'react'
import AllUsers from './AllUsers'

export default class Play extends Component {
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
