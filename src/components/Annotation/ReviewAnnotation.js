import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import { Heading, MediumSpace, Cite, SmallSpace } from '../../styles/PageStyles'
import { Form, ButtonBlock, FormBlock } from '../../styles/FormStyles'
import { dateFormat } from '../../utilities/DateFormat'
import { UserContext } from '../../context/UserContext'
import { Button } from '../ui/Button'
import { LinkButton } from '../ui/LinkButton'
import { Comment } from '../Comment/Comment'

const ReviewAnnotation = ({ annotation, closeModal, rejectAnnotation, approveAnnotation }) => {

  /* Context */
  const { user } = useContext(UserContext);

  /* State */
  const [comment, setComment] = useState("");

  /* Functions */
  function handleRejectAnnotation(e) {
    e.preventDefault();
    rejectAnnotation({
      ...annotation,
      isSubmitted: false,
      comment: {
        comment,
        account: {
          id: user.id
        }
      }
    })
  }

  function handleApproveAnnotation(e) {
    e.preventDefault();
    approveAnnotation({
      ...annotation,
      isApproved: true,
      comment: {
        comment,
        account: {
          id: user.id
        }
      }
    })
  }

  let prevOrder = null;
  console.log(annotation)
  return (
    <Form>
      <Heading>
        <h1>Annotation Review</h1>
        <Cite>Annotation submitted by <strong>{annotation.account.nameFirst} {annotation.account.nameLast}</strong> on <strong>{dateFormat(annotation.updatedAt)}</strong></Cite>
      </Heading>
      <MediumSpace>
        <h3>Lyrics</h3>
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
        <h3>Annotation</h3>
        <div dangerouslySetInnerHTML={{ __html: annotation.annotation }} />
      </MediumSpace>
      {annotation.comments.length > 0 &&
        <FormBlock>
          <h3>Notes</h3>
          {annotation.comments.map(comment => {
            return (
              <Comment key={comment.id} {...comment} />
            )
          })}
        </FormBlock>
      }
      <FormBlock>
        <h3>Add Notes</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}></textarea>
      </FormBlock>
      <ButtonBlock>
        <div>
          <LinkButton onClick={closeModal}>cancel</LinkButton>
        </div>
        <div>
          <Button
            style={{ marginRight: "1rem" }}
            onClick={handleRejectAnnotation}>
            Request Revisions
          </Button>
          <Button
            className="secondary"
            onClick={handleApproveAnnotation}>
            Approve
          </Button>
        </div>
      </ButtonBlock>
    </Form>
  )
}

export default ReviewAnnotation

const StyledNote = styled.div`
  display: flex;

  .image {
    border-radius: 50%;
    overflow: hidden;
    height: 4rem;
    width: 4rem;
    margin-right: 1rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .note {
    display: flex;
    flex-direction: column;
  }

  .author {
    font-style: italic;
    font-size: 1.4rem;
    color: #333;
  }
`