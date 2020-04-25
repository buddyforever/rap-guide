import React, { useState } from 'react'
import { Form, FormBlock, ButtonBlock, Button, LinkButton } from '../../styles/FormStyles'
import { Heading } from '../../styles/PageStyles'
import { Editor } from '@tinymce/tinymce-react';
import ConfirmButton from '../Form/ConfirmButton'
import styled from 'styled-components'
import { dateFormat } from '../../utilities/DateFormat'

export const AnnotationForm = ({ lessonLyric, saveAnnotation, cancel }) => {

  const [annotation, setAnnotation] = useState({
    annotation: lessonLyric.annotations.length ? lessonLyric.annotations[0].annotation : "<p></p>",
    id: lessonLyric.annotations.length ? lessonLyric.annotations[0].id : null,
    notes: lessonLyric.annotations[0].notes
  });
  const [submitting, setSubmitting] = useState(false);

  function handleSaveAnnotation(e) {
    e.preventDefault();
    saveAnnotation({
      lessonLyricId: lessonLyric.id,
      annotation,
      isSubmitted: false,
    });
    cancel();
  }

  function handleSubmitAnnotation(e) {
    e.preventDefault();
    saveAnnotation({
      lessonLyricId: lessonLyric.id,
      annotation,
      isSubmitted: true,
    });
    cancel();
  }

  function handleCancel(e) {
    e.preventDefault();
    cancel();
  }

  function handleEditorChange(content, editor) {
    setAnnotation(prevState => ({
      ...prevState,
      annotation: content,
    }));
  }

  return (
    <Form>
      <Heading>
        <h1>Add Annotation</h1>
        <h2>{lessonLyric.lyric}</h2>
        {lessonLyric.notes.length > 0 &&
          <div dangerouslySetInnerHTML={{ __html: lessonLyric.notes }}></div>
        }
      </Heading>
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
        <label>Annotation</label>
        <Editor
          initialValue={annotation.annotation}
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
      </FormBlock>
      <ButtonBlock>
        <LinkButton onClick={handleCancel}>Cancel</LinkButton>
        <div>
          {!submitting &&
            <Button
              className="secondary"
              style={{ marginRight: "1rem" }}
              onClick={handleSaveAnnotation}>
              Save Annotation
            </Button>
          }
          <ConfirmButton
            handleClick={(submitting) => setSubmitting(submitting)}
            handleConfirm={handleSubmitAnnotation}>
            Submit Annotation
          </ConfirmButton>
        </div>
      </ButtonBlock>
    </Form>
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