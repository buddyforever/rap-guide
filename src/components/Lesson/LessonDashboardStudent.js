import React, { useContext, useState, useEffect, useRef } from 'react'
import { UserContext } from '../../context/UserContext'

import { Heading, MediumSpace, StyledContent, HtmlContent, StyledColumns } from '../../styles/PageStyles'
import Video from '../Guide/Video'
import Lyrics from '../Lyric/Lyrics'
import Loader from '../Loader'
import styled from 'styled-components'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_ANNOTATION, UPDATE_ANNOTATION } from '../../queries/annotations'

/* Get Full Document Height */
let body = document.body
let html = document.documentElement;
let height = Math.max(body.scrollHeight, body.offsetHeight,
  html.clientHeight, html.scrollHeight, html.offsetHeight)

const LessonDashboardStudent = ({ lesson, refetch }) => {

  /* Refs */
  const ref = useRef();

  /* Context */
  const { user } = useContext(UserContext)

  /* State */
  const [lyrics, setLyrics] = useState(null);
  const [annotation, setAnnotation] = useState(null);
  const [top, setTop] = useState(120);
  const [offset, setOffset] = useState(120);
  const [selectedLyrics, setSelectedLyrics] = useState([]);

  /* Queries */
  const [createAnnotation] = useMutation(CREATE_ANNOTATION)
  const [updateAnnotation] = useMutation(UPDATE_ANNOTATION)

  function handleAddAnnotation({ annotation, isSubmitted, lessonLyricId }) {
    if (!annotation.id) {
      createAnnotation({
        variables: {
          isSubmitted: isSubmitted,
          account: user.id,
          lessonLyric: lessonLyricId,
          annotation: annotation.annotation
        }
      }).then((createAnnotation) => {
        refetch()
      })
    } else {
      updateAnnotation({
        variables: {
          id: annotation.id,
          isSubmitted: isSubmitted,
          annotation: annotation.annotation
        }
      }).then((updateAnnotation) => {
        refetch()
      })
    }
  }

  async function handleLyricClick(lyric, lyricsTop, lyricsHeight, arrowTop, maxY) {
    // Select or deselect the lyric
    if (!selectedLyrics.find(selectedLyric => selectedLyric.id === lyric.id)) {
      setSelectedLyrics(prevState => [
        lyric,
        ...selectedLyrics
      ])
    } else {
      setSelectedLyrics(prevState => prevState.filter(selectedLyric => selectedLyric.id !== lyric.id))
      return false; // We are only deselecting so no need to move the display
    }
    await setAnnotation(lyric.lyric); // Display Annotation or Annotation Form
    let contentHeight = ref.current.getBoundingClientRect().height;
    setTop(arrowTop);

    /*  If there annotation is shorter then the
        available space then center it */
    if (contentHeight / 2 < maxY && (arrowTop + contentHeight) < lyricsHeight) {
      let diff = (arrowTop - (contentHeight / 2))
      setOffset(diff > 0 ? diff : 0)
    } else if ((arrowTop + contentHeight) > lyricsHeight) {
      setOffset(lyricsHeight - contentHeight)
    } else {
      let newTop = arrowTop - maxY;
      setOffset(newTop > 0 ? newTop : 0)
    }
  }

  function combineLyrics() {
    /* Combine Guide Lyrics with Lesson Lyrics */
    var combinedLyrics = lesson.guide.lyrics.map(l1 => {
      return Object.assign({}, l1, lesson.lyrics.filter(l2 => l1.id === l2.id)[0])
    });

    setLyrics(combinedLyrics);
  }

  useEffect(() => {
    combineLyrics();
  }, [])

  if (!lyrics) return <Loader />
  return (
    <StyledContent>
      <Heading>
        <h1 style={{ textAlign: "center" }}>{lesson.lessonTitle}</h1>
      </Heading>

      <HtmlContent>
        <MediumSpace dangerouslySetInnerHTML={{ __html: lesson.lessonDescription }} />
      </HtmlContent>

      <Heading>
        <h1>{lesson.guide.videoTitle}</h1>
      </Heading>

      <Video guide={lesson.guide} />

      <StyledColumns>
        <Lyrics
          lyrics={lyrics}
          selectedLyrics={selectedLyrics}
          refetch={refetch}
          onClick={handleLyricClick} />
        <StyledMovingColumn
          arrowTop={top}
          contentTop={offset}
          className={annotation ? "" : "hidden"}>
          <div className="arrow"></div>
          <div className="annotation" ref={ref}>
            <div dangerouslySetInnerHTML={{ __html: annotation ? annotation : "<p></p>" }} />
          </div>
        </StyledMovingColumn>
      </StyledColumns>
    </StyledContent>
  )
}

export default LessonDashboardStudent

const StyledMovingColumn = styled.div`
  position: relative;
  opacity: 1;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .arrow {
    position: absolute;
    display: block;
    width: 2rem;
    height: 2rem;
    border-left: 3px solid #DD3333;
    border-top: 3px solid #DD3333;
    background-color: #FFFFFF;
    transform: rotate(-45deg);
    transition: all .3s ease;
    left: -0.9rem;
    z-index: 10;

    top: ${props => props.arrowTop}px;
  }

  .annotation {
    position: absolute;
    padding-left: 2rem;
    border-left: 3px solid #DD3333;
    transition: all .3s ease;
    z-index: 5;
    top: ${props => props.contentTop}px;
  }
`