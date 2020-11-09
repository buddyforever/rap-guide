import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Editor } from '@tinymce/tinymce-react';

import { ButtonBlock } from '../../styles/FormStyles'
import { Heading, MediumSpace } from '../../styles/PageStyles'
import { ConfirmButton } from '../ui/ConfirmButton'
import { dateFormat } from '../../utilities/DateFormat'
import { UserContext } from '../../context/UserContext'
import { Button } from '../ui/Button'
import { LinkButton } from '../ui/LinkButton'
import { Message } from '../ui/Message'
import { DotWave as Loader } from '../ui'
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

  let prevOrder = null;

  return (
    <div>
      <h3>Annotation</h3>
      {selectedLyrics.length > 0 &&
        <div>
          {annotation && annotation.account.email}
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
        </div>
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
              'searchreplace visualblocks code fullscreen image',
              'insertdatetime media table paste code help wordcount'
            ],
            a11y_advanced_options: true,
            content_style: 'img.left { float: left; margin-right: 10px } ' +
              'img.right { float: right; margin-left: 10px } ' +
              'img.center { display: block; margin: 0 auto; } ',
            formats: {
              alignleft: { selector: 'img', classes: 'left' },
              aligncenter: { selector: 'img', classes: 'center' },
              alignright: { selector: 'img', classes: 'right' }
            },
            toolbar:
              'undo redo | formatselect | link | bold italic image | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            images_upload_handler: async function (blobInfo, success, failure, progress) {
              const data = new FormData()
              data.append('file', blobInfo.blob(), blobInfo.filename())
              data.append('upload_preset', 'rap_guide_annotation')

              const response = await fetch(
                '	https://api.cloudinary.com/v1_1/burtonmedia/image/upload',
                {
                  method: "POST",
                  body: data
                }
              )

              const file = await response.json()

              success(file.secure_url);
            }
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
              preClick={(checked) => setIsSubmit(checked)}
              onConfirm={handleSubmitAnnotation}>Submit</ConfirmButton>
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