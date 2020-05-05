import React, { useRef } from 'react'

import Lyric from './Lyric'
import { documentOffset } from '../../utilities/Position'

const AnnotateLyrics = ({
  lyrics,
  assignedLyrics = [],
  selectedLyrics = [],
  refetch,
  onClick,
  showNote,
  hide
}) => {

  const lyricsRef = useRef();

  function handleClick(lyric, top, maxY) {
    if (lyric.annotations) {
      onClick(
        lyric,
        documentOffset(lyricsRef.current).top,
        lyricsRef.current.getBoundingClientRect().height,
        (top - lyricsRef.current.getBoundingClientRect().y),
        maxY);
      hide();
    }
  }

  function handleHover(note, top, maxY) {
    showNote(
      note,
      documentOffset(lyricsRef.current).top,
      lyricsRef.current.getBoundingClientRect().height,
      (top - lyricsRef.current.getBoundingClientRect().y),
      maxY);
  }

  function handleMouseOut() {
    hide();
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
        let relatedName = null;
        let isAnnotated = false;
        if (lyric.annotations && lyric.annotations.length) {
          relatedName = lyric.annotations[0].id
          isAnnotated = true
        }
        if (!relatedName && lyric.notes && lyric.notes.length) {
          relatedName = lyric.notes[0].id
        }
        return (
          <div key={lyric.id}>
            {nextBar && <div style={{ marginBottom: "2rem" }}></div>}
            <div>
              <Lyric
                name={relatedName}
                lyric={lyric}
                isSelectable={isAssigned}
                selected={isSelected}
                onMouseOver={(e) => {
                  if (selectedLyrics && selectedLyrics.length) return
                  if (relatedName) {
                    let related = document.querySelectorAll(`div[name=${relatedName}]`);
                    related.forEach(node => {
                      node.classList.add("hovering");
                      if (!e.target.classList.contains("annotated")) {
                        console.log(!e.target.classList.contains("annotated"));
                        node.classList.add("note")
                      }
                    })
                  }
                  if (!isAnnotated && lyric.notes && lyric.notes.length) {
                    const pos = e.target.getBoundingClientRect();
                    const maxY = documentOffset(e.target).top - window.scrollY - 130; // How far up I can move
                    handleHover(lyric.notes[0], pos.y, maxY);
                  }
                  if (isAnnotated) {
                    const pos = e.target.getBoundingClientRect();
                    const maxY = documentOffset(e.target).top - window.scrollY - 130; // How far up I can move
                    handleHover(lyric.annotations[0], pos.y, maxY);
                  }
                }}
                onMouseOut={(e) => {
                  document.querySelectorAll(".hovering").forEach(node => {
                    node.classList.remove("hovering")
                  });
                  if (!selectedLyrics.length) {
                    hide();
                  }
                }}
                onClick={(e) => {
                  if (lyric.isExample) return;
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

export default AnnotateLyrics