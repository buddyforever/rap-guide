import React, { useState } from 'react'
import { Form, FormBlock, ButtonBlock, Button, Textarea } from '../../styles/FormStyles'

export const AnnotationForm = ({ closeModal, lyric, lyricId }) => {

  const [annotation, setAnnotation] = useState("");

  function saveAnnotation(e) {
    e.preventDefault();
    alert("Annotation Saved")
    closeModal();
  }

  return (
    <Form onSubmit={saveAnnotation}>
      <h1>Add Annotation</h1>
      <h2>{lyric}</h2>
      <FormBlock>
        <label>Annotation</label>
        <Textarea value={annotation} onChange={(e) => setAnnotation(e.target.value)}></Textarea>
      </FormBlock>
      <ButtonBlock>
        <a href="#" onClick={closeModal}>Cancel</a>
        <Button>Add Annotation</Button>
      </ButtonBlock>
    </Form>
  )
}

export default AnnotationForm;
