import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = () => {
  return (
    <div>
      <iframe
        style={{border: 0, width: 330, height: 42}}
        src="https://bandcamp.com/EmbeddedPlayer/album=1051830778/size=small/bgcol=333333/linkcol=ffffff/track=3299718613/transparent=true/"
        seamless
      >
        <a href="http://robuwaldorf.bandcamp.com/album/video-game-music">
          Music by Robu Waldorf
        </a>
      </iframe>
    </div>
  )
}

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
