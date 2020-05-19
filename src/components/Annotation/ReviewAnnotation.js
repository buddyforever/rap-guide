import React, { useState, useContext } from 'react'
<<<<<<< HEAD
import { Heading, MediumSpace, Cite, SmallSpace, StyledComment } from '../../styles/PageStyles'
=======
import styled from 'styled-components'

import { Heading, MediumSpace, Cite, SmallSpace } from '../../styles/PageStyles'
>>>>>>> authentication
import { Form, ButtonBlock, FormBlock } from '../../styles/FormStyles'
import { dateFormat } from '../../utilities/DateFormat'
<<<<<<< HEAD
=======
import { UserContext } from '../../context/UserContext'
>>>>>>> authentication
import { Button } from '../ui/Button'
import { LinkButton } from '../ui/LinkButton'
import { Comment } from '../Comment/Comment'

const ReviewAnnotation = ({
  annotation,
  closeModal,
  rejectAnnotation,
  approveAnnotation
}) => {

  /* Context */
  const { user } = useContext(UserContext);

  /* State */
  const [comment, setComment] = useState("");

  /* Functions */
  function handleRejectAnnotation(e) {
    e.preventDefault();

    let comments = [];
    if (comment.length > 0) {
      comments = [{
        comment,
        status: "PUBLISHED",
        isPublic: false,
        account: {
          connect: {
            id: user.id
          }
        }
      }]
    }

    rejectAnnotation({
      ...annotation,
      isSubmitted: false,
<<<<<<< HEAD
      comments
=======
      comment: {
        comment,
        account: {
          id: user.id
        }
      }
>>>>>>> authentication
    })
  }

  function handleApproveAnnotation(e) {
    e.preventDefault();

    let comments = [];
    if (comment.length > 0) {
      comments = [{
        comment,
        status: "PUBLISHED",
        isPublic: false,
        account: {
          connect: {
            id: user.id
          }
        }
      }]
    }

    approveAnnotation({
      ...annotation,
      isApproved: true,
<<<<<<< HEAD
      comments
=======
      comment: {
        comment,
        account: {
          id: user.id
        }
      }
>>>>>>> authentication
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
<<<<<<< HEAD
              <StyledComment
                style={{ margin: "1rem 0" }}
                key={comment.id}>
                <div className="image">
                  <img src={comment.account.image} alt={comment.account.nameFirst + ' ' + comment.account.nameLast} />
                </div>
                <div className="comment">
                  <span
                    className="text"
                    dangerouslySetInnerHTML={{ __html: comment.comment }} />
                  <span className="author">{comment.account.nameFirst} {comment.account.nameLast} at {dateFormat(comment.updatedAt)}</span>
                </div>
              </StyledComment>
=======
              <Comment key={comment.id} {...comment} />
>>>>>>> authentication
            )
          })}
        </FormBlock>
      }
      <FormBlock>
<<<<<<< HEAD
        <label>Teacher Comment</label>
=======
        <h3>Add Notes</h3>
>>>>>>> authentication
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

