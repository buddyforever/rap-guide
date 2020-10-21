import React, { useRef, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

import Lyric from './Lyric'
import { documentOffset } from '../../utilities/Position'
import { StyledMovingColumn, StyledColumns } from '../../styles/PageStyles'
import { Form, FormBlock } from '../../styles/FormStyles'
import { UserContext } from '../../context/UserContext'
import Loader from '../Loader'
import { LinkButton, Button } from '../ui'
import { dateFormat } from '../../utilities/DateFormat'
import { Comment } from '../Comment/Comment'
import Video from '../Guide/Video'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_PUBLIC_LYRICS_BY_GUIDE_ID } from '../../queries/lyric'
import { CREATE_LIKE, DELETE_LIKE } from '../../queries/likes'
import { CREATE_COMMENT } from '../../queries/comments'

const PublicLyrics = ({
  guideID,
  annotationIsShown,
  videoTitle,
  videoUrl
}) => {

  /* State */
  const [hidden, setHidden] = useState(true);
  const [top, setTop] = useState(120);
  const [offset, setOffset] = useState(120);
  const [selectedAnnotations, setSelectedAnnotations] = useState(null)
  const [currentAnnotation, setCurrentAnnotation] = useState(0)
  const [selectedLyrics, setSelectedLyrics] = useState(null)
  const [annotationHeight, setAnnotationHeight] = useState(0)
  const [comment, setComment] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [startTime, setStartTime] = useState(0)

  function updateWindowSize() {
    const size = getWindowSize()
    if (size.width < 750) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    setWindowSize(size)
  }

  useEffect(() => {
    updateWindowSize()
    window.addEventListener("resize", updateWindowSize);
  }, [])

  /* Context */
  const { user } = useContext(UserContext);

  /* Queries */
  const { loading, data, refetch, error } = useQuery(GET_PUBLIC_LYRICS_BY_GUIDE_ID, {
    variables: {
      guideID: guideID
    }
  });

  const [createLike] = useMutation(CREATE_LIKE)
  const [deleteLike] = useMutation(DELETE_LIKE)
  const [createComment] = useMutation(CREATE_COMMENT)

  /* Refs */
  const lyricsRef = useRef(null)
  const annotationRef = useRef(null)
  const movingColumnRef = useRef(null)

  let currentBar = 1;
  let nextBar = false;
  let isLiking = false

  function toggleLike(e) {
    if (isLiking) return
    isLiking = true
    const annotationID = selectedAnnotations[currentAnnotation].id
    const elm = e.currentTarget
    if (elm.classList.contains("liked")) {
      elm.classList.remove("liked") // Assume success
      deleteLike({
        variables: {
          id: elm.id
        }
      }).then(response => {
        refetch()
        let newState = selectedAnnotations.map(annotation => {
          if (annotation.id === annotationID) {
            return {
              ...annotation,
              likes: annotation.likes.filter(like => like.id !== response.data.deleteLike.id)
            }
          } else {
            return annotation
          }
        })
        setSelectedAnnotations(newState)
        isLiking = false
      })
    } else {
      elm.classList.add("liked") // Assume success
      createLike({
        variables: {
          annotation: {
            id: annotationID // This needs to be passed in
          },
          account: {
            id: user.id
          }
        }
      }).then(response => {
        refetch()
        const newLike = {
          id: response.data.createLike.id,
          account: {
            id: user.id
          }
        }
        let newState = selectedAnnotations.map(annotation => {
          if (annotation.id === annotationID) {
            return {
              ...annotation,
              likes: [
                ...annotation.likes,
                newLike
              ],
            }
          } else {
            return annotation
          }
        })
        setSelectedAnnotations(newState)
        isLiking = false
      })
    }
  }

  function sortLyrics(lyrics) {
    let sortedLyrics = lyrics.sort((a, b) => {
      return a.order > b.order ? 1 : b.order > a.order ? -1 : 0
    })
    return sortedLyrics
  }

  function handleClick(lyric, top, maxY) {
    annotationIsShown(true)
    showAnnotation(
      lyric.annotations,
      0,
      lyricsRef.current.getBoundingClientRect().height,
      (top - lyricsRef.current.getBoundingClientRect().y),
      maxY);
  }

  function highlightLyrics(lyrics) {
    document.querySelectorAll(".hovering").forEach(node => {
      node.classList.remove("hovering")
    });

    setSelectedLyrics(sortLyrics(lyrics))
  }

  function moveWindow(lyricsHeight, arrowTop, maxY) {
    let contentHeight = annotationRef.current.getBoundingClientRect().height;
    setTop(arrowTop);

    /*  If the content is shorter than the
        available space then center it */
    movingColumnRef.current.style.height = `${Math.max(lyricsHeight, contentHeight)}px`

    if (contentHeight > lyricsHeight) {
      setOffset(0)
    } else {
      if (contentHeight / 2 < maxY && (arrowTop + contentHeight) < lyricsHeight) {
        let diff = (arrowTop - (contentHeight / 2))
        setOffset(diff > 0 ? diff + 10 : 0) // + 10px for half the height of the arrow
      } else if ((arrowTop + contentHeight) > lyricsHeight) {
        setOffset(lyricsHeight - contentHeight)
      } else {
        let newTop = arrowTop - maxY;
        setOffset(newTop > 0 ? newTop : 0)
      }
    }

    setHidden(false);

  }

  async function showAnnotation(annotations, index, lyricsHeight, arrowTop, maxY) {
    if (!annotations || !annotations.length) return
    setSelectedAnnotations(annotations)
    setCurrentAnnotation(index)
    highlightLyrics(annotations[index].lyrics)

    if (!isMobile) {
      // Need to wait a bit for the state to finish updating
      await setTimeout(() => {
        moveWindow(lyricsHeight, arrowTop, maxY)
      }, 50)
    } else {
      setHidden(false);
    }
  }

  function getWindowSize() {
    return { width: window.innerWidth, height: window.innerHeight }
  }

  function handleHide() {
    setHidden(true);
  }

  function nextAnnotation() {
    if (currentAnnotation + 1 < selectedAnnotations.length) {
      setSelectedLyrics(sortLyrics(selectedAnnotations[currentAnnotation + 1].lyrics))
      setCurrentAnnotation(currentAnnotation + 1)
    } else {
      setSelectedLyrics(sortLyrics(selectedAnnotations[0].lyrics))
      setCurrentAnnotation(0)
    }
  }

  function prevAnnotation() {
    if (currentAnnotation > 0) {
      setSelectedLyrics(sortLyrics(selectedAnnotations[currentAnnotation - 1].lyrics))
      setCurrentAnnotation(currentAnnotation - 1)
    } else {
      setSelectedLyrics(sortLyrics(selectedAnnotations[selectedAnnotations.length - 1].lyrics))
      setCurrentAnnotation(selectedAnnotations.length - 1)
    }
  }

  useEffect(() => {
    if (annotationRef.current) {
      setAnnotationHeight(annotationRef.current.getBoundingClientRect().height)
    }
  }, [currentAnnotation])

  let prevOrder = null;

  if (loading || !data) return <Loader />
  return (
    <StyledColumns
      template="320px auto"
      className="lyrics"
      style={{ marginBottom: "5rem" }}
    >
      <div ref={lyricsRef}>
        {data.lyrics.map(lyric => {
          nextBar = (currentBar !== lyric.bar);
          currentBar = lyric.bar;
          return (
            <div key={lyric.id}>
              {nextBar && <div style={{ marginBottom: "2rem" }}></div>}
              <div style={{ display: "flex", alignItems: "center" }}>
                <Lyric
                  name={lyric.annotations[0] ? lyric.annotations[0].id : ""}
                  lyric={lyric}
                  selected={selectedLyrics ? selectedLyrics.find(sLyric => sLyric.id === lyric.id) : false}
                  isPublic={true}
                  onMouseOver={(e) => {
                    if (lyric.annotations && lyric.annotations.length) {
                      let related = document.querySelectorAll(`div[name=${lyric.annotations[0].id}]`);
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
      <StyledMovingColumn
        ref={movingColumnRef}
        arrowTop={top}
        contentTop={offset}
        className={hidden ? "hidden annotation-display" : "annotation-display"}>
        <div className="mobile-close">
          <button onClick={handleHide}><FontAwesomeIcon icon={faTimesCircle} /></button>
        </div>
        <div className="arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209 233"><title>baba-rapguide-com</title><g id="Layer_1" data-name="Layer 1"><path fill="#DD3333" d="M122.66,111.32C146.43,92.46,157,66,157.16,27H140.83c0,3-.1,5.89-.24,8.74H66.72C66.57,32.9,66.5,30,66.49,27H50.16c.12,36.22,9.27,61.63,29.61,80.18a155.23,155.23,0,0,1,17.4-11.07A72.29,72.29,0,0,1,81.31,81.29h44.81c-7,9-17.05,16.88-31.41,23.83-44.54,21.55-45.4,89.56-45.34,97.82H65.7q0-6.47.7-12.87H141c.42,4.27.64,8.57.64,12.87H158C158,195.36,157.25,137.43,122.66,111.32ZM69,54.29a103.19,103.19,0,0,1-1.8-11.44h72.83a100.86,100.86,0,0,1-1.78,11.44Zm7.45,19.89A65.05,65.05,0,0,1,70.9,61.4h65.55a64.9,64.9,0,0,1-5.63,12.78Zm23.89,50.94c1.13-.54,2.17-1.13,3.27-1.69,1.09.56,2.16,1.14,3.29,1.69a47.84,47.84,0,0,1,18.19,16H82.29A47.43,47.43,0,0,1,100.38,125.12ZM77.93,148.21h51.59a89.22,89.22,0,0,1,6.21,14.86h-64a89.15,89.15,0,0,1,6.19-14.86ZM140.14,183H67.25c.63-4.32,1.46-8.59,2.49-12.78h68C138.71,174.37,139.53,178.64,140.14,183Z" /></g></svg>
        </div>
        <div className="content view" ref={annotationRef}>
          {selectedAnnotations && (
            <AnimatePresence initial={false} exitBeforeEnter>
              <StyledAnnotation
                key={currentAnnotation}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: .2 }}
              >
                <div className="annotation-nav" style={{ display: "flex", justifyContent: "space-between" }}>
                  <small>({currentAnnotation + 1} / {selectedAnnotations.length} annotations)</small>
                  {selectedAnnotations.length > 1 &&
                    <div>
                      <LinkButton onClick={prevAnnotation}>Previous</LinkButton>
                      <LinkButton onClick={nextAnnotation}>Next</LinkButton>
                    </div>
                  }
                </div>
                <div className="lyrics">
                  <div>
                    {selectedLyrics.map(lyric => {
                      let brokenLyrics = false;
                      if (prevOrder !== null && lyric.order !== prevOrder + 1) {
                        brokenLyrics = true;
                      }
                      prevOrder = lyric.order;
                      return (
                        <em
                          key={lyric.id}
                          style={{ display: "block", marginBottom: ".5rem" }}
                        >
                          {brokenLyrics && <div>...</div>}
                          {lyric.lyric}
                        </em>
                      )
                    })}
                  </div>
                  <div style={{ width: "100%" }}>
                    <Video
                      videoTitle={videoTitle}
                      videoUrl={`${videoUrl}?start=${startTime}&autoplay=1&muted=0`}
                    />
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: selectedAnnotations[currentAnnotation].annotation.replace(/(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z09+&@#\/%=~_|])/, '<a href="$1">$1</a>') }} />
                <div className="author">
                  by {selectedAnnotations[currentAnnotation].account.displayName || 'animal-1234'} at {dateFormat(selectedAnnotations[currentAnnotation].createdAt)}
                </div>
                {/*
                  Disabled until we ensure the load works without this engagement piece
                <div className="likes">
                  <span
                    onClick={toggleLike}
                    id={selectedAnnotations[currentAnnotation].likes.find(like => like.account.id === user.id) ? selectedAnnotations[currentAnnotation].likes.find(like => like.account.id === user.id).id : ""}
                    className={selectedAnnotations[currentAnnotation].likes.find(like => like.account.id === user.id) ? "liked" : ""}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </span> <span>{selectedAnnotations[currentAnnotation].likes.length}</span> likes
              </div>
                <Form>
                  <FormBlock>
                    <h3>Comments</h3>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}></textarea>
                    <Button onClick={handleCreateComment}>Add Comment</Button>
                  </FormBlock>
                </Form>
                {selectedAnnotations[currentAnnotation].comments.length > 0 &&
                  <FormBlock>
                    {selectedAnnotations[currentAnnotation].comments.map(comment => {
                      if (comment.comment.length === 0) return
                      return (
                        <Comment key={comment.id} {...comment} />
                      )
                    })}
                  </FormBlock>
                }
                */}
              </StyledAnnotation>
            </AnimatePresence>
          )}
        </div>
      </StyledMovingColumn>
    </StyledColumns >
  )
}

export default PublicLyrics

const StyledAnnotation = styled(motion.div)`
  p {
    font-size: 1.6rem;
  }

  .author {
    font-size: 1.4rem;
    color: #8099b5;
  }

  .likes {
    margin: 1rem 0;

    span:first-child {
      color: #ffd0d0;
      cursor: pointer;
    }

    span.liked {
      color: ${props => props.theme.colors.primary};
    }
  }

  .lyrics {
    margin: 2.5rem 0;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid black;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
  }
`