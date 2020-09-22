import React, { useContext, useState } from 'react'
import { useParams } from "react-router-dom"
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import { StyledContent, Heading, Split, Cite, MediumSpace } from '../../styles/PageStyles'
import { Button } from '../ui'
import { UserContext } from '../../context/UserContext'
import Loader from '../Loader'
import { Comment } from '../Comment/Comment'
import { dateFormat } from '../../utilities/DateFormat'

import { useQuery } from '@apollo/react-hooks'
import { GET_ANNOTATIONS_BY_LESSON_ID } from '../../queries/annotations'

export const Annotations = () => {

  /*  State */
  const [currentAnnotation, setCurrentAnnotation] = useState(0)

  /* Context */
  const { user } = useContext(UserContext);

  /* Paramaters */
  let { id } = useParams();

  /* Queries */
  const { loading, data, refetch } = useQuery(GET_ANNOTATIONS_BY_LESSON_ID, {
    variables: {
      id: id
    }
  });

  function nextAnnotation(direction) {
    let newAnnotation = currentAnnotation + direction
    if (newAnnotation < 0) newAnnotation = data.annotations.length - 1
    if (newAnnotation > data.annotations.length - 1) newAnnotation = 0
    setCurrentAnnotation(newAnnotation)
  }

  if (loading || !data) return <Loader />
  if (!data.annotations || data.annotations.length === 0) return <StyledContent>No Annotations</StyledContent>
  return (
    <StyledContent>
      <Heading>
        <h1>Annotations</h1>
        <h2>{data.annotations[0].lesson.lessonTitle}</h2>
        <h3>Showing {currentAnnotation + 1} of {data.annotations.length}</h3>
      </Heading>
      <MediumSpace>
        <Split>
          <Button secondary onClick={() => nextAnnotation(-1)}>Prev</Button>
          <Button onClick={() => nextAnnotation(1)}>Next</Button>
        </Split>
        {data.annotations.map((annotation, index) => {
          let prevOrder = null;
          return (
            <StyledAnnotation
              key={annotation.id}
              className={index === currentAnnotation ? "active" : ""}>
              <div>
                <MediumSpace className="lyrics">
                  {annotation.lyrics.map(lyric => {
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
                </MediumSpace>
                <MediumSpace>
                  <div dangerouslySetInnerHTML={{ __html: annotation.annotation }} />
                </MediumSpace>

                <MediumSpace className="comments">
                  <h3>Comments</h3>
                  {annotation.comments.length === 0 && <p>No Comments</p>}
                  {annotation.comments.map(comment => (
                    <Comment key={comment.id} {...comment} />
                  ))}
                </MediumSpace>
                <MediumSpace>
                  <Cite>Annotation submitted by <strong><a href={`mailto:${annotation.account.email}`}>{annotation.account.email}</a> ({annotation.account.displayName})</strong> <br /> on <strong>{dateFormat(annotation.updatedAt)}</strong></Cite>
                </MediumSpace>
              </div>
            </StyledAnnotation>
          )
        })}
        <Split>
          <Button secondary onClick={() => nextAnnotation(-1)}>Prev</Button>
          <Button onClick={() => nextAnnotation(1)}>Next</Button>
        </Split>
      </MediumSpace>
    </StyledContent>
  )
}

export default Annotations;

const StyledAnnotation = styled(motion.div)`
  margin: 1em 0;
  opacity: 0;
  display: none;

  p {
    font-size: 20px!important;
    max-width: 500px;
    margin-bottom: 1em!important;
  }

  &.active {
    opacity: 1;
    display: block;
  }

  .lyrics {
    padding: 40px;
    background-color: #f5f5f5;
    border-radius: 3px;
  }
`