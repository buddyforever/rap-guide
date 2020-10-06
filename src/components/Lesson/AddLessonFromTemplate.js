import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from "react-router-dom"

import LessonDetailsForm from './LessonDetailsForm'
import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import { LinkButton } from '../ui/LinkButton'
import Loader from '../Loader'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_LESSON } from '../../queries/lessons'
import { GET_LESSON_TEMPLATE_BY_ID } from '../../queries/lessons'

const AddLessonFromTemplate = () => {

  /* Paramaters */
  let { id } = useParams();

  /* State */
  const [redirect, setRedirect] = useState(null);
  const [template, setTemplate] = useState(null);
  const [lesson, setLesson] = useState(null);

  /* Queries */
  const { loading, data } = useQuery(GET_LESSON_TEMPLATE_BY_ID, {
    variables: {
      id: id
    }
  })
  const [createLesson] = useMutation(CREATE_LESSON);

  /* Functions */
  function addLesson(lesson) {
    createLesson({
      variables: {
        templateId: id,
        ...lesson
      }
    }).then(response => {
      setRedirect(`/lesson/edit/${response.data.createLesson.id}/2`);
    });
  }

  useEffect(() => {
    if (!data) return
    /* Extract the lesson adaptation
       information and clear the fields */
    setTemplate({
      lessonTitle: data.lesson.lessonTitle,
      className: data.lesson.className,
      instructorName: data.lesson.instructorName,
      institutionName: data.lesson.institutionName
    })
    data.lesson.maxStudents = null
    data.lesson.className = ""
    data.lesson.instructorName = ""
    data.lesson.institutionName = ""
    data.lesson.isTemplate = false
    setLesson(data.lesson)
  }, [data])

  if (loading || !lesson) return <Loader />
  return (
    <StyledContent style={{ marginBottom: "5rem" }}>
      <Heading style={{ paddingBottom: 0 }}>
        <h1>Lesson Editor</h1>
        <MediumSpace>
          <LinkButton className="active">Lesson Details</LinkButton>
          <LinkButton disabled>Assign Lyrics</LinkButton>
          <LinkButton disabled>Lesson Dashboard</LinkButton>
        </MediumSpace>
      </Heading>
      <LessonDetailsForm template={template} lesson={lesson} onSubmit={addLesson} />
      {redirect && <Redirect to={redirect} />}
    </StyledContent>
  )
}

export default AddLessonFromTemplate