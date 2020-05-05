import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import { ButtonBlock } from '../../styles/FormStyles'
import { Heading, MediumSpace } from '../../styles/PageStyles'
import { Editor } from '@tinymce/tinymce-react';
import { ConfirmButton } from '../ui/ConfirmButton'
import { dateFormat } from '../../utilities/DateFormat'
import { UserContext } from '../../context/UserContext'
import { Button } from '../ui/Button'
import { LinkButton } from '../ui/LinkButton'
import { Message } from '../ui/Message'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_COMMENT } from '../../queries/comments'

export const AnnotationForm = ({
  lesson,
  selectedLyrics,
  setSelectedLyrics,
  annotation,
  saveAnnotation,
  cancel
}) => {

  /* Context */
  const { user } = useContext(UserContext)

  /* Queries */
  const [createNote] = useMutation(CREATE_COMMENT)

  /* State */
  const [content, setContent] = useState(annotation ? annotation.annotation : "<p></p>");
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState(null)

  function handleSaveAnnotation() {
    alert("saved")
  }

  function handleSubmitAnnotation() {
    alert("submitted")
  }

  /*   function addNote(e) {
      e.preventDefault()
      createNote({
        variables: {
          note: note,
          annotationId: annotation.id,
          account: user.id
        }
      }).then(data => {
        setNotes(prevState => {
          return [
            ...prevState,
            data.data.createNote
          ]
        })
        setNote("");
      })
    }

    function handleKeyPress(e) {
      if (noteOnEnter && e.key === 'Enter') {
        addNote(e);
      }
    } */

  function handleCancel() {
    setSelectedLyrics([]);
    cancel();
  }

  function handleEditorChange(content, editor) {
    setContent(content);
  }

  return (
    <div>
      <h3>Annotation</h3>
      {selectedLyrics.length > 0 &&
        <div>
          <h6 style={{ margin: "1rem 0" }}>Selected Lyrics</h6>
          {selectedLyrics.map(lyric => {
            return (
              <em
                key={lyric.id}
                style={{ display: "block", marginBottom: ".5rem" }}
              >
                {lyric.lyric}
              </em>
            )
          })}
        </div>
      }
      <MediumSpace>
        <Editor
          initialValue={content}
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
        <div>
          {!isSubmit &&
            <Button
              style={{ marginRight: "1rem" }}
              secondary
              onClick={handleSaveAnnotation}>Save</Button>
          }
          <ConfirmButton
            onClick={(checked) => setIsSubmit(checked)}
            onConfirm={handleSubmitAnnotation}>Submit</ConfirmButton>
        </div>
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
    </div >
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