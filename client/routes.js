import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Home,
  Main,
  Play,
  Create,
  Room,
  Instruction,
  ReactWhiteboard,
  Guesser,
  Game,
} from './components'
import {me} from './store'
import {fetchWord} from './store/word'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchWord()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/create" component={Create} />
        <Route exact path="/" component={Home} />
        <Route path="/Play" component={Play} />
        <Route path="/room" component={Room} />
        <Route path="/whiteboard" component={ReactWhiteboard} />
        <Route path="/guesser" component={Guesser} />
        {/* <Route path="/create" component={Create} />
          <Route exact path="/main" component={Main} /> */}
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
        {/* <Route path="/Play" component={Play} />
          <Route path="/room" component={Room} />
          <Route path="/whiteboard" component={ReactWhiteboard} />
          <Route path="/guesser" component={Guesser} /> */}

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/create" component={Create} />
            <Route exact path="/" component={Home} />
            <Route path="/main" component={Main} />
            <Route path="/Play" component={Play} />
            <Route path="/room" component={Room} />
            <Route path="/instruction" component={Instruction} />
            <Route path="/whiteboard" component={ReactWhiteboard} />
            <Route path="/guesser" component={Guesser} />
            {/* <Route path="/home" component={UserHome} /> */}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchWord: () => dispatch(fetchWord()),
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
