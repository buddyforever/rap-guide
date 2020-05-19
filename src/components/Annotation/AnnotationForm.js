import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import { ButtonBlock } from '../../styles/FormStyles'
import { Heading, MediumSpace, StyledComment } from '../../styles/PageStyles'
import { Editor } from '@tinymce/tinymce-react';
import { ConfirmButton } from '../ui/ConfirmButton'
import { dateFormat } from '../../utilities/DateFormat'
import { UserContext } from '../../context/UserContext'
import { Button } from '../ui/Button'
import { LinkButton } from '../ui/LinkButton'
import { Message } from '../ui/Message'
import Loader from '../ui/Loader'
import Comment from '../Comment/Comment'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_COMMENT } from '../../queries/comments'

export const AnnotationForm = ({
  lesson,
  selectedLyrics,
  setSelectedLyrics,
  annotation,
  saveAnnotation,
  isSaving,
  cancel
}) => {

  /* Context */
  const { user } = useContext(UserContext)

  /* State */
  const [content, setContent] = useState(annotation ? annotation.annotation : "<p></p>");
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState(null)

  function handleSaveAnnotation() {
    saveAnnotation({
      id: annotation ? annotation.id : null,
      annotation: content,
      lyrics: selectedLyrics.map(lyric => { return { id: lyric.id } }),
      lesson: {
        id: lesson.id
      }
    }, false)
  }

  function handleSubmitAnnotation() {
    saveAnnotation({
      id: annotation ? annotation.id : null,
      annotation: content,
      lyrics: selectedLyrics.map(lyric => { return { id: lyric.id } }),
      lesson: {
        id: lesson.id
      }
    }, true)
  }

  function handleCancel() {
    setSelectedLyrics([]);
    cancel();
  }

  function handleEditorChange(content, editor) {
    setContent(content);
  }

  useEffect(() => {
    if (annotation) {
      setContent(annotation.annotation);
    }
  }, [annotation]);
<<<<<<< HEAD
  console.log(annotation)
=======

  let prevOrder = null;

>>>>>>> authentication
  return (
    <div>
      <h3>Annotation</h3>
      {selectedLyrics.length > 0 &&
        <MediumSpace>
          <h6 style={{ margin: "1rem 0" }}>Selected Lyrics</h6>
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
        </MediumSpace>
      }
      {annotation.comments && annotation.comments.length &&
        <MediumSpace>
          <h6 style={{ margin: "1rem 0" }}>Teacher's Comments</h6>
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
        </MediumSpace>
      }
      {annotation && annotation.comments && annotation.comments.length > 0 &&
        <MediumSpace>
          <h3>Teacher Comments</h3>
          {annotation.comments.map(comment => (
            <Comment key={comment.id} {...comment} />
          ))}
        </MediumSpace>
      }
      <MediumSpace>
        <Editor
          value={content}
          apiKey="6fh30tpray4z96bvzqga3vqcj57v5hvg2infqk924uvnxr13"
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | link | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
          }}
          onEditorChange={handleEditorChange}
        />
      </MediumSpace>
      <ButtonBlock style={{ marginTop: "1rem" }}>
        <LinkButton onClick={handleCancel}>cancel</LinkButton>
        {!isSaving &&
          <div>
            {!isSubmit &&
              <Button
                style={{ marginRight: "1rem" }}
                secondary
                onClick={handleSaveAnnotation}>Save</Button>
            }
            <ConfirmButton
              onClick={(checked) => setIsSubmit(checked)}
              onConfirm={handleSubmitAnnotation}>Submit for Review</ConfirmButton>
          </div>
        }
        {isSaving && <div><Loader /></div>}
      </ButtonBlock>
      {
        message &&
        <Message
          toast
          style={{ marginTop: "1rem" }}
          dismiss={() => setMessage(null)}
          type={message.type}
          title={message.title}>
          {message.text}
        </Message>
      }
    </div>
  )
}

export default AnnotationForm;

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