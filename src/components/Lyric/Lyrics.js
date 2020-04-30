import React, { useRef } from 'react'

import Lyric from './Lyric'
import { offset } from '../../utilities/Position'

const Lyrics = ({ lyrics, selectedLyrics, refetch, onClick }) => {

  const lyricsRef = useRef();

  function handleClick(lyric, top, maxY) {
    onClick(
      lyric,
      offset(lyricsRef.current).top,
      lyricsRef.current.getBoundingClientRect().height,
      (top - lyricsRef.current.getBoundingClientRect().y),
      maxY);
  }

  let currentBar = 1;
  let nextBar = false;

  return (
    <div ref={lyricsRef}>
      {lyrics.map(lyric => {
        nextBar = (currentBar !== lyric.bar);
        currentBar = lyric.bar;
        let isSelected = selectedLyrics.find(selectedLyric => selectedLyric.id === lyric.id) ? true : false
        return (
          <div key={lyric.id}>
            {nextBar && <div><br /><br /></div>}
            <Lyric
              lyric={lyric}
              selected={isSelected}
              onClick={(e) => {
                const pos = e.target.getBoundingClientRect();
                const maxY = e.target.offsetTop - window.scrollY - 130; // How far up I can move
                handleClick(lyric, pos.y, maxY);
              }} />
          </div>
        )
      })}
    </div>
  )
}

export default Lyrics