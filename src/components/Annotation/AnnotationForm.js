import React, { useState } from 'react'
import { Form, FormBlock, ButtonBlock, Button, Textarea } from '../../styles/FormStyles'
import { Heading } from '../../styles/PageStyles'
import { Editor } from '@tinymce/tinymce-react';

export const AnnotationForm = ({ closeModal, lyric, lyricId }) => {

  const [annotation, setAnnotation] = useState("");

  function saveAnnotation(e) {
    e.preventDefault();
    alert("Annotation Saved")
    closeModal();
  }

  function handleEditorChange(content, editor) {
    setAnnotation(content);
  }

  return (
    <Form onSubmit={saveAnnotation}>
      <Heading>
        <h1>Add Annotation</h1>
        <h2>{lyric}</h2>
      </Heading>
      <FormBlock>
        <label>Annotation</label>
        <Editor
          initialValue="<p></p>"
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
        <a href="#" onClick={closeModal}>Cancel</a>
        <Button>Add Annotation</Button>
      </ButtonBlock>
    </Form>
  )
}

export default AnnotationForm;
