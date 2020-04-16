import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Message from '../Layout/Message'
import { Form, ButtonBlock, Button } from '../../styles/FormStyles'
import { Heading } from '../../styles/PageStyles'
import LessonFormDetails from './LessonFormDetails'

const LessonForm = ({ lesson = null }) => {

  /* Form State */
  const [message, setMessage] = useState(null);
  const [page, setPage] = useState(0);
  const [redirect, setRedirect] = useState(null);

  /* Lesson State */
  const [lessonDetails, setLessonDetails] = useState(lesson ? lesson.details : "<div>This is the lesson details");
  const [lessonTitle, setLessonTitle] = useState(lesson ? lesson.title : "");
  const [topics, setTopics] = useState(lesson ? lesson.topics : []);
  const [guide, setGuide] = useState(lesson ? lesson.guide : null);

  function saveLesson() {
    alert("Saved");
  }

  function addTopic(topic) {
    setTopics(prevState => [
      topic,
      ...prevState
    ]);
  }

  return (
    <div>
      <Heading>
        <h1>Lesson Setup</h1>
        <h2>{lessonTitle.length ? lessonTitle : "Creating a lesson for"} - <a href={`https://www.youtube.com/watch?v=${guide.videoId}`} target="_blank">{guide.title}</a></h2>
      </Heading>

      <Message message={message} />

      <Form>
        {page === 0 &&
          <LessonFormDetails
            lessonTitle={lessonTitle}
            setLessonTitle={setLessonTitle}
            lessonDetails={lessonDetails}
            setLessonDetails={setLessonDetails}
            topics={topics}
            addTopic={addTopic} />
        }
        {page === 1 &&
          <h1>Page 2</h1>
        }
        {page === 2 &&
          <h1>Page 3</h1>
        }
        <ButtonBlock
          style={{
            position: "sticky",
            bottom: 0,
            paddingBottom: "2.5rem",
            backgroundColor: "white"
          }}
        >
          {page === 0 && <Link to="/">Cancel</Link>}
          {page > 0 && page < 3 && <Button onClick={(e) => {
            e.preventDefault();
            setPage(page - 1)
          }}>Back</Button>
          }
          {page < 2 && <Button onClick={(e) => {
            e.preventDefault();
            setPage(page + 1)
          }}>Next</Button>
          }
          {page === 2 && <Button onClick={saveLesson}>Save Lesson</Button>}
          {page === 3 && <Button onClick={() => setRedirect(true)}>View Lessons</Button>}
        </ButtonBlock>
      </Form>
      {redirect && <Redirect to="/lessons" />}
    </div>
  )
}

export default LessonForm