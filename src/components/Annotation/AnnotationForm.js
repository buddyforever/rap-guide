import React, { useState } from 'react'
import { Form, FormBlock, ButtonBlock, Button, LinkButton } from '../../styles/FormStyles'
import { Heading } from '../../styles/PageStyles'
import { Editor } from '@tinymce/tinymce-react';

export const AnnotationForm = ({ lessonLyric, saveAnnotation, cancel }) => {

  const [annotation, setAnnotation] = useState({
    annotation: lessonLyric.annotations.length ? lessonLyric.annotations[0].annotation : "<p></p>",
    id: lessonLyric.annotations.length ? lessonLyric.annotations[0].id : null
  });

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
          <Button className="secondary" style={{ marginRight: "1rem" }} onClick={handleSaveAnnotation}>Save Annotation</Button>
          <Button onClick={handleSubmitAnnotation}>Submit Annotation</Button>
        </div>
      </ButtonBlock>
    </Form>
  )
}

export default AnnotationForm;
