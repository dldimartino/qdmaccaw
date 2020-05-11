import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/allUsers'
import {fetchWord} from '../../store/word'
import {AllPlayers} from './AllPlayers'
import {Word} from './Word'

export class Play extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchWord()
  }

  render() {
    return (
      <div>
        <Word allWords={this.props.word} />
        <AllPlayers allUsers={this.props.allUsers} />
      </div>
    )
  }
}

const mapState = state => ({
  allUsers: state.allUsers,
  word: state.word
})

const mapDispatch = dispatch => ({
  fetchUsers: () => {
    dispatch(fetchUsers())
  },
  fetchWord: () => {
    dispatch(fetchWord())
  }
})

export default connect(mapState, mapDispatch)(Play)
