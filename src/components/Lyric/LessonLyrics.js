import React, { useRef, useContext, useEffect } from 'react'

import Lyric from './Lyric'
import { documentOffset } from '../../utilities/Position'
import { StyledMovingColumn, StyledColumns } from '../../styles/PageStyles'
import { UserContext } from '../../context/UserContext'
import Loader from '../Loader'

import { useQuery } from '@apollo/react-hooks'
import { GET_LESSON_LYRICS_BY_GUIDE_ID } from '../../queries/lyric'

const LessonLyrics = ({ guideID, lessonID }) => {

  /* Context */
  const { user } = useContext(UserContext);

  /* Queries */
  const { loading, data } = useQuery(GET_LESSON_LYRICS_BY_GUIDE_ID, {
    variables: {
      guideID,
      lessonID
    }
  });

  const lyricsRef = useRef();

  let currentBar = 1;
  let nextBar = false;

  function handleClick() {

  }

  useEffect(() => {
    console.log(data);
  }, [data])

  if (loading || !data) return <Loader />
  return (
    <StyledColumns>
      <div ref={lyricsRef}>
        {data.lyrics.map(lyric => {
          nextBar = (currentBar !== lyric.bar);
          currentBar = lyric.bar;
          return (
            <div key={lyric.id}>
              {nextBar && <div style={{ marginBottom: "2rem" }}></div>}
              <div style={{ display: "flex", alignItems: "center" }}>
                <Lyric
                  lyric={lyric}
                  selected={false}
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
      <StyledMovingColumn>
        <h1>HERE</h1>
      </StyledMovingColumn>
    </StyledColumns >
  )
}

export default LessonLyrics