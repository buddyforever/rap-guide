import React, { useState, useContext } from 'react'
import { Heading, MediumSpace, Cite, SmallSpace, StyledComment } from '../../styles/PageStyles'
import { Form, ButtonBlock, FormBlock } from '../../styles/FormStyles'
import { UserContext } from '../../context/UserContext'
import { dateFormat } from '../../utilities/DateFormat'
import { Button } from '../ui/Button'
import { LinkButton } from '../ui/LinkButton'


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
      comments
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
      comments
    })
  }

  return (
    <Form>
      <Heading>
        <h1>Annotation Review</h1>
        <Cite>submitted by {annotation.account.nameFirst} {annotation.account.nameLast} on {dateFormat(annotation.updatedAt)}</Cite>
      </Heading>
      <SmallSpace>
        {annotation.lyrics.map(lyric => {
          return (
            <strong
              key={lyric.id}
              style={{ display: "block", marginBottom: ".5rem" }}
            >
              {lyric.lyric}
            </strong>
          )
        })}
      </SmallSpace>
      <MediumSpace dangerouslySetInnerHTML={{ __html: annotation.annotation }} />
      {annotation.comments.length > 0 &&
        <FormBlock>
          <label>Comments</label>
          {annotation.comments.map(comment => {
            return (
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
            )
          })}
        </FormBlock>
      }
      <FormBlock>
        <label>Teacher Comment</label>
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

