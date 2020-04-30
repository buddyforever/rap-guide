import React, { useState, useContext } from 'react'
import { Heading, MediumSpace, Cite, SmallSpace } from '../../styles/PageStyles'
import { Form, ButtonBlock, FormBlock } from '../../styles/FormStyles'
import { UserContext } from '../../context/UserContext'
import { dateFormat } from '../../utilities/DateFormat'
import styled from 'styled-components'
import { Button } from '../ui/Button'
import { LinkButton } from '../ui/LinkButton'


const ReviewAnnotation = ({ annotation, closeModal, rejectAnnotation, approveAnnotation }) => {

  /* Context */
  const { user } = useContext(UserContext);

  /* State */
  const [note, setNote] = useState("");

  /* Functions */
  function handleRejectAnnotation(e) {
    e.preventDefault();
    rejectAnnotation({
      ...annotation,
      isSubmitted: false,
      note: {
        note,
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
      note: {
        note,
        account: {
          id: user.id
        }
      }
    })
  }

  return (
    <Form>
      <Heading>
        <h1>Annotation Review</h1>
        <Cite>submitted by {annotation.account.nameFirst} {annotation.account.nameLast} on {dateFormat(annotation.updatedAt)}</Cite>
      </Heading>
      <SmallSpace>
        <strong>{annotation.lessonLyric.lyric.lyric}</strong>
      </SmallSpace>
      <MediumSpace dangerouslySetInnerHTML={{ __html: annotation.annotation }} />
      {annotation.notes.length > 0 &&
        <FormBlock>
          <label>Notes</label>
          {annotation.notes.map(note => {
            console.log(note)
            return (
              <StyledNote style={{ margin: "1rem 0" }} key={note.id}>
                <div className="image">
                  <img src={note.account.image} alt={note.account.nameFirst + ' ' + note.account.nameLast} />
                </div>
                <div className="note">
                  <span className="text">{note.note}</span>
                  <span className="author">{note.account.nameFirst} {note.account.nameLast} at {dateFormat(note.updatedAt)}</span>
                </div>
              </StyledNote>
            )
          })}
        </FormBlock>
      }
      <FormBlock>
        <label>Teacher Notes</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}></textarea>
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