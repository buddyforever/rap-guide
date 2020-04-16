import React from 'react'
import { Button, ButtonBlock, FormBlock, FormPage } from '../../styles/FormStyles'
import { MediumSpace } from '../../styles/PageStyles'
import { Tag } from '../../styles/TagStyles'
import { Editor } from '@tinymce/tinymce-react';

const variants = {
  open: { x: "-50vw", opacity: 1 },
  closed: { x: "100%", opacity: 0 }
}

const LessonFormDetails = ({
  lessonTitle,
  setLessonTitle,
  lessonDetails,
  setLessonDetails,
  topics,
  addTopic }) => {

  function handleLessonDetailsContent(content, editor) {
    setLessonDetails(content);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTopic(e.target.value);
    }
  }

  return (
    <FormPage initial="initial" animate="show" exit="exit" variants={variants}>
      <FormBlock>
        <h3>Lesson Details</h3>
        <p>This is placeholder text that will describe what this rich text editor is for.</p>
        <MediumSpace style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <input
              style={{ width: "300px" }}
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              placeholder="Give this lesson a name..." />
          </div>
        </MediumSpace>
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
          onEditorChange={handleLessonDetailsContent}
        />
      </FormBlock>
      <FormBlock>
        <label>Enter the topic(s) that this lesson plan aim's to cover.</label>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            value=""
            placeholder="Climate Chaos..."
            onKeyPress={handleKeyPress}
            onChange={(e) => addTopic(e.target.value)} />
          <Button
            style={{ marginLeft: "1rem", width: "200px" }}
            onClick={(e) => { e.preventDefault(); addTopic(e.target.value) }}>Add Topic</Button>
        </div>
        <MediumSpace>
          {topics.map(topic => (
            <Tag
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}>{topic}</Tag>
          ))}
        </MediumSpace>
      </FormBlock>
    </FormPage>
  )
}

export default LessonFormDetails