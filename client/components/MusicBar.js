import React from 'react'

export default function MusicBar() {
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
