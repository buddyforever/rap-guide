import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom"

import { ButtonBlock, FormBlock, FormPage } from '../../styles/FormStyles'
import { MediumSpace, Heading, StyledContent } from '../../styles/PageStyles'
import { Tag } from '../../styles/TagStyles'
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '../ui/Button'
import { UserContext } from '../../context/UserContext'
import { Message } from '../ui/Message'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { EditorPropTypes } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/EditorPropTypes'

const LessonDetailsForm = ({ lesson, onSubmit }) => {

  /* Context */
  const { user } = useContext(UserContext)

  /* Fields */
  const [lessonTitle, setLessonTitle] = useState(lesson.lessonTitle || "")
  const [lessonDescription, setLessonDescription] = useState(lesson.lessonDescription || "<p></p>")
  const [maxStudents, setMaxStudents] = useState(lesson.maxStudents || '')
  const [topics, setTopics] = useState(lesson.topics || [])
  const [topic, setTopic] = useState("")

  /* Message */
  const [message, setMessage] = useState(null);

  /* Functions */
  function handleSubmit(e) {
    e.preventDefault()

    /* Handle Errors */
    let errors = []
    if (!lessonTitle.length) errors = ["Please enter a title", ...errors]
    if (!lessonDescription.length) errors = ["Please enter a description", ...errors]
    if (isNaN(maxStudents)) errors = ["Please enter the maximum number of students", ...errors]
    if (errors.length) {
      setMessage({
        type: "error",
        title: "Please fix the following errors",
        text: errors.map((error, index) => {
          return <p key={index}>{error}</p>
        })
      })
      return false
    }

    onSubmit({
      id: lesson.id || null,
      lessonTitle,
      lessonDescription,
      maxStudents: parseInt(maxStudents),
      topics,
      guide: {
        id: lesson.guide.id
      },
      accounts: [{
        id: user.id
      }]
    });
  }

  function handleLessonDescription(content, editor) {
    setLessonDescription(content);
  }

  /* TOPICS */
  function addTopic() {
    if (topic.length === 0 || topics.includes(topic)) {
      setTopic("")
      return
    }
    setTopics(prevState => ([
      topic,
      ...prevState
    ]))
    setTopic("");
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTopic();
    }
  }

  function removeTopic(topicToRemove) {
    // If there is only one topic it ends up being null
    if (topics.length === 1) {
      setTopics([]);
    } else {
      setTopics(prevState => {
        return prevState.filter(topic => {
          if (topic === topicToRemove) return false
          return true
        })
      })
    }
  }

  /* Effects */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [message]);

  return (
    <>
      <Heading>
        <h2>Lesson Details</h2>
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

      <FormBlock style={{ display: "none" }}>
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
    </>
  )
}

export default LessonDetailsForm