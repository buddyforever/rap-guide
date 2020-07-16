import React, { useRef, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
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

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_LESSON_LYRICS_BY_GUIDE_ID } from '../../queries/lyric'
import { CREATE_LIKE, DELETE_LIKE } from '../../queries/likes'
import { CREATE_COMMENT } from '../../queries/comments'

const LessonLyrics = ({ guideID, lessonID }) => {

  /* State */
  const [hidden, setHidden] = useState(true);
  const [top, setTop] = useState(120);
  const [offset, setOffset] = useState(120);
  const [selectedAnnotations, setSelectedAnnotations] = useState(null)
  const [currentAnnotation, setCurrentAnnotation] = useState(0)
  const [selectedLyrics, setSelectedLyrics] = useState(null)
  const [annotationHeight, setAnnotationHeight] = useState(0)
  const [comment, setComment] = useState("")

  /* Context */
  const { user } = useContext(UserContext);

  /* Queries */
  const { loading, data, refetch } = useQuery(GET_LESSON_LYRICS_BY_GUIDE_ID, {
    variables: {
      guideID,
      lessonID
    }
  });
  const [createLike] = useMutation(CREATE_LIKE)
  const [deleteLike] = useMutation(DELETE_LIKE)
  const [createComment] = useMutation(CREATE_COMMENT)

  /* Refs */
  const lyricsRef = useRef()
  const annotationRef = useRef()
  const movingColumnRef = useRef()

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

  function showAnnotation(annotations, index, lyricsHeight, arrowTop, maxY) {
    setSelectedAnnotations(annotations)
    setCurrentAnnotation(index)
    highlightLyrics(annotations[index].lyrics)

    // Need to wait a bit for the state to finish updating
    setTimeout(() => {
      moveWindow(lyricsHeight, arrowTop, maxY)
    }, 50)
  }

  function handleHide() {
    setHidden(true);
  }

  function nextAnnotation() {
    if (currentAnnotation + 1 < selectedAnnotations.length) {
      setCurrentAnnotation(currentAnnotation + 1)
    } else {
      setCurrentAnnotation(0)
    }
  }

  function prevAnnotation() {
    if (currentAnnotation - 1 > 0) {
      setCurrentAnnotation(currentAnnotation - 1)
    } else {
      setCurrentAnnotation(selectedAnnotations.length - 1)
    }
  }

  function handleCreateComment(e) {
    e.preventDefault()
    if (!comment.length) return
    createComment({
      variables: {
        comment: comment,
        annotationId: selectedAnnotations[currentAnnotation].id,
        account: user.id,
        isPublic: true
      }
    }).then(response => {
      refetch()
      setComment("")
    })
  }

  useEffect(() => {
    if (annotationRef.current) {
      setAnnotationHeight(annotationRef.current.getBoundingClientRect().height)
    }
  }, [currentAnnotation])

  let prevOrder = null;

  if (loading || !data) return <Loader />
  return (
    <StyledColumns style={{ marginBottom: "5rem" }}>
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
        className={hidden ? "hidden" : ""}>
        <div className="arrow"></div>
        <div className="content" ref={annotationRef}>
          {selectedAnnotations && (
            <AnimatePresence initial={false} exitBeforeEnter>
              <StyledAnnotation
                key={currentAnnotation}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: .2 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <small>({currentAnnotation + 1} / {selectedAnnotations.length} annotations)</small>
                  {selectedAnnotations.length > 1 &&
                    <div>
                      <LinkButton onClick={prevAnnotation}>Previous</LinkButton>
                      <LinkButton onClick={nextAnnotation}>Next</LinkButton>
                    </div>
                  }
                </div>
                <div className="lyrics">
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
                <div dangerouslySetInnerHTML={{ __html: selectedAnnotations[currentAnnotation].annotation }} />
                <div className="author">
                  by {selectedAnnotations[currentAnnotation].account.displayName || 'anonymous'}
                at {dateFormat(selectedAnnotations[currentAnnotation].updatedAt)}
                </div>
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
              </StyledAnnotation>
            </AnimatePresence>
          )}
        </div>
      </StyledMovingColumn>
    </StyledColumns >
  )
}

export default LessonLyrics

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
  }
`