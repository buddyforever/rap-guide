import React, { useState } from 'react'
import { useParams, Redirect } from "react-router-dom"

import LessonDetailsForm from './LessonDetailsForm'
import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import { LinkButton } from '../ui/LinkButton'
import Loader from '../Loader'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_LESSON } from '../../queries/lessons'
import { GET_GUIDE_BY_ID } from '../../queries/guides'

const AddLesson = () => {

  /* Paramaters */
  let { id } = useParams();

  /* State */
  const [redirect, setRedirect] = useState(null);

  /* Queries */
  const { loading, data } = useQuery(GET_GUIDE_BY_ID, {
    variables: {
      id: id
    }
  })
  const [createLesson] = useMutation(CREATE_LESSON);

  /* Functions */
  function addLesson(lesson) {
    createLesson({
      variables: {
        ...lesson
      }
    }).then(response => {
      setRedirect(`/lesson/edit/${response.data.createLesson.id}/2`);
    });
  }



  if (loading) return <Loader />
  const lesson = {
    guide: data.guide
  }

  return (
    <StyledContent>
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

export default AddLesson