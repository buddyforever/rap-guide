import React, { useRef, useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'

import Lyric from './Lyric'
import { documentOffset } from '../../utilities/Position'
import { Message } from '../ui/Message'

const weights = [1, 0.5, 0.33, 0.25];

const AnnotateLyrics = ({
  lyrics,
  assignedLyrics = [],
  selectedLyrics = [],
  refetch,
  onClick,
  showNote,
  hide,
  maxWeight
}) => {

  /* State */
  const [message, setMessage] = useState(null)

  /* Context */
  const { user } = useContext(UserContext)

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
    //hide();
  }

  let currentBar = 1;
  let nextBar = false;

  return (
    <div ref={lyricsRef}>
      {lyrics.map(lyric => {
        nextBar = (currentBar !== lyric.bar);
        currentBar = lyric.bar;
        let isSubmitted = false;
        let isSelected =
          selectedLyrics.find(selectedLyric => selectedLyric.id === lyric.id) ? true : false
        let isAssigned =
          assignedLyrics.find(assignedLyric => assignedLyric.id === lyric.id) ? true : false
        let relatedName = null;
        let isAnnotated = false;
        let weight = 0;
        let hasMyAnnotation = false
        if (lyric.annotations && lyric.annotations.length) {
          weight = lyric.annotations.reduce((sum, annotation) => {
            if (annotation.account.id === user.id) hasMyAnnotation = true
            let amount = 0
            switch (annotation.lyrics.length) {
              case 1:
                amount = 1
                break
              case 2:
                amount = 0.5
                break
              case 3:
                amount = 0.33
                break
              case 4:
                amount = 0.25
                break
              default:
                amount = 0
            }
            return sum + amount
          }, 0);
          if (hasMyAnnotation) {
            let annotation = lyric.annotations.find(annotation => annotation.account.id === user.id)
            relatedName = annotation.id
            isAnnotated = true
            isSubmitted = annotation.isSubmitted
          }
        }
        if (!relatedName && lyric.notes && lyric.notes.length) {
          relatedName = lyric.notes[0].id
        }
        lyric.weight = weight
        return (
          <div key={lyric.id}>
            {nextBar && <div style={{ marginBottom: "2rem" }}></div>}
            <div>
              <Lyric
                mineOnly={true}
                hasMyAnnotation={hasMyAnnotation}
                name={relatedName}
                lyric={lyric}
                isSelectable={isAssigned}
                selected={isSelected}
                weight={weight.toFixed(2)}
                maxWeight={maxWeight}
                onMouseOver={(e) => {
                  if (selectedLyrics && selectedLyrics.length) return
                  if (relatedName && hasMyAnnotation) {
                    let related = document.querySelectorAll(`div[name=${relatedName}]`);
                    related.forEach(node => {
                      node.classList.add("hovering");
                      if (!e.target.classList.contains("annotated")) {
                        node.classList.add("note")
                      }
                    })
                  }
                  if (!isAnnotated && lyric.notes && lyric.notes.length) {
                    const pos = e.target.getBoundingClientRect();
                    const maxY = documentOffset(e.target).top - window.scrollY - 130; // How far up I can move
                    handleHover(lyric.notes[0], pos.y, maxY);
                  }
                  if (isAnnotated && hasMyAnnotation) {
                    const pos = e.target.getBoundingClientRect();
                    const maxY = documentOffset(e.target).top - window.scrollY - 130; // How far up I can move
                    handleHover(lyric.annotations.find(annotation => annotation.account.id === user.id), pos.y, maxY);
                  }
                }}
                onMouseOut={(e) => {
                  document.querySelectorAll(".hovering").forEach(node => {
                    node.classList.remove("hovering")
                  });
                  /* if (!selectedLyrics.length) {
                    hide();
                  } */
                }}
                onClick={(e) => {
                  let weightToAdd = weights[selectedLyrics.length]
                  if (lyric.isExample) return;
                  if (isSubmitted) return;
                  if (weight + weightToAdd > maxWeight) {
                    setMessage({
                      type: "error",
                      title: "Too many annotations!",
                      text: "This lyric has already been used by several of your classmates, please select a different lyric or try combining it with other lyrics"
                    })
                    return
                  }
                  const pos = e.target.getBoundingClientRect();
                  const maxY = documentOffset(e.target).top - window.scrollY - 130; // How far up I can move
                  handleClick(lyric, pos.y, maxY);
                }} />
            </div>
          </div>
        )
      })}
      {
        message &&
        <Message
          toast
          dismiss={() => setMessage(null)}
          type={message.type}
          autoDismiss={7000}
          title={message.title}>
          {message.text}
        </Message>
      }
    </div>
  )
}

export default AnnotateLyrics