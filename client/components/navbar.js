import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">Home</Link>
          <Link to="/whiteboard">WhiteBoard</Link>
          <Link to="/guesser">Guess Word</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">Home</Link>
          <Link to="/whiteboard">WhiteBoard</Link>
          <Link to="/guesser">Guess Word</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      <iframe
        style={{border: 0, width: 500, height: 42}}
        src="https://bandcamp.com/EmbeddedPlayer/album=1051830778/size=small/bgcol=ffffff/linkcol=0687f5/track=2184348779/transparent=true/"
        seamless
      >
        <a href="http://robuwaldorf.bandcamp.com/album/video-game-music">
          Video Game Music by Robu Waldorf
        </a>
      </iframe>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
