import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom"

import { ButtonBlock, FormBlock, FormPage } from '../../styles/FormStyles'
import { MediumSpace, Heading } from '../../styles/PageStyles'
import { Tag } from '../../styles/TagStyles'
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '../ui/Button'
import { UserContext } from '../../context/UserContext'
import { Message } from '../ui/Message'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const variants = {
  open: { x: "-50vw", opacity: 1 },
  closed: { x: "100%", opacity: 0 }
}

const LessonLyricsForm = ({ lesson, onSubmit }) => {

  /* Fields */

  /* Message */
  const [message, setMessage] = useState(null);

  /* Functions */
  function handleSubmit(e) {
    e.preventDefault()

    onSubmit({
      //data
    });
  }

  /* Effects */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [message]);

  return (
    <FormPage initial="initial" animate="show" exit="exit" variants={variants}>
      <Heading>
        <h1>{lesson.id ? "Edit Lesson" : "Create New Lesson"}</h1>
        <MediumSpace>
          <h2>{lessonTitle.length ? lessonTitle : "Lesson Name..."}</h2>
          <h3>A lesson plan for <a href={`https://www.youtube.com/watch?v=${lesson.guide.videoId}`} target="_blank">{lesson.guide.videoTitle}</a></h3>
        </MediumSpace>
      </Heading>

      {message && <Message type={message.type} title={message.title}>{message.text}</Message>}

      <FormBlock>
        <h3>Lesson Name</h3>
        <input
          style={{ width: "100%" }}
          type="text"
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          placeholder="Give this lesson a name..." />
      </FormBlock>

      <FormBlock>
        <h3>Lesson Plan</h3>
        <p>This is placeholder text that will describe what this rich text editor is for.</p>
        <Editor
          initialValue={lessonDescription}
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
          onEditorChange={handleLessonDescription}
        />
      </FormBlock>

      <FormBlock>
        <h3>Students</h3>
        <p>Enter the maximum number of students expected to enroll in this class.</p>
        <input
          type="number"
          value={maxStudents}
          onChange={(e) => setMaxStudents(e.target.value)}
          placeholder="20..." />
      </FormBlock>

      <FormBlock>
        <h3>Topics</h3>
        <p>Enter the topic(s) that this lesson plan aim's to cover.</p>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            value={topic}
            placeholder="Climate Chaos..."
            onKeyPress={handleKeyPress}
            onChange={(e) => setTopic(e.target.value)} />
          <Button
            secondary
            style={{ marginLeft: "1rem", width: "100px", height: "auto" }}
            onClick={(e) => { e.preventDefault(); addTopic(e.target.value) }}
            iconLeft={faPlus}>Add</Button>
        </div>
        <MediumSpace>
          {topics.map(topic => (
            <Tag
              key={topic}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}>{topic}</Tag>
          ))}
        </MediumSpace>
      </FormBlock>
      <ButtonBlock>
        <Link to="/lessons">Back to lessons</Link>
        <Button onClick={handleSubmit}>{lesson.id ? "Save & Continue" : "Create Lesson"}</Button>
      </ButtonBlock>
    </FormPage>
  )
}

export default LessonLyricsForm