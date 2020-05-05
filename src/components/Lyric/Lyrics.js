import React, { useRef } from 'react'

import Lyric from './Lyric'
import { documentOffset } from '../../utilities/Position'

const Lyrics = ({
  lyrics,
  assignedLyrics = [],
  selectedLyrics = [],
  refetch,
  onClick,
  toggleChecked,
  isSelectable = false
}) => {

  const lyricsRef = useRef();

  function handleClick(lyric, top, maxY) {
    onClick(
      lyric,
      documentOffset(lyricsRef.current).top,
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
        let isSelected =
          selectedLyrics.find(selectedLyric => selectedLyric.id === lyric.id) ? true : false
        let isAssigned =
          assignedLyrics.find(assignedLyric => assignedLyric.id === lyric.id) ? true : false
        if (isAssigned) {
          lyric.annotations = []
        } else {
          lyric.annotations = null
        }
        return (
          <div key={lyric.id}>
            {nextBar && <div style={{ marginBottom: "2rem" }}></div>}
            <div style={{ display: "flex", alignItems: "center" }}>
              {toggleChecked &&
                <span style={{ marginRight: "1rem" }}>
                  <input
                    style={{ transform: "scale(1.25)", padding: "1rem" }}
                    type="checkbox"
                    checked={isAssigned}
                    onChange={(e) => {
                      toggleChecked(lyric, e.target.checked);
                    }} />
                </span>
              }
              <Lyric
                name={lyric.notes && lyric.notes.length > 0 ? lyric.notes[0].id : null}
                isSelectable={isSelectable}
                lyric={lyric}
                selected={isSelected}
                onMouseOver={(e) => {
                  if (lyric.notes && lyric.notes.length) {
                    let related = document.querySelectorAll(`div[name=${lyric.notes[0].id}]`);
                    related.forEach(node => {
                      node.classList.add("hovering");
                    })
                  }
                }}
                onMouseOut={(e) => {
                  document.querySelectorAll(".hovering").forEach(node => {
                    node.classList.remove("hovering")
                  });
                }}
                onClick={(e) => {
                  const pos = e.target.getBoundingClientRect();
                  const maxY = documentOffset(e.target).top - window.scrollY - 130; // How far up I can move
                  handleClick(lyric, pos.y, maxY);
                }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Lyrics