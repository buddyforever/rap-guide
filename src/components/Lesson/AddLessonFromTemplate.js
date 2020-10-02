import React, { useState } from 'react'
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

  if (loading) return <Loader />
  const { lesson } = data
  // Each lesson will be different for these
  lesson.maxStudents = null
  lesson.className = ""
  lesson.instructorName = ""
  lesson.institutionName = ""
  lesson.isTemplate = false
  return (
    <StyledContent style={{ marginBottom: "5rem" }}>
      <Heading>
        <h1>Lesson Editor</h1>
        <MediumSpace>
          <LinkButton className="active">Lesson Details</LinkButton>
          <LinkButton disabled>Assign Lyrics</LinkButton>
          <LinkButton disabled>Lesson Dashboard</LinkButton>
        </MediumSpace>
      </Heading>
      <LessonDetailsForm lesson={lesson} onSubmit={addLesson} />
      {redirect && <Redirect to={redirect} />}
    </StyledContent>
  )
}

export default AddLessonFromTemplate