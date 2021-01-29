import React, { useState } from 'react'
import { useParams, Redirect } from "react-router-dom"

import LessonDetailsForm from './LessonDetailsForm'
import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import { LinkButton } from '../ui/LinkButton'
import Loader from '../Loader'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_LESSON, PUBLISH_LESSON } from '../../queries/lessons'
import { GET_GUIDE_BY_SLUG } from '../../queries/guides'

const AddLesson = () => {

  /* Paramaters */
  let { slug } = useParams();

  /* State */
  const [redirect, setRedirect] = useState(null);

  /* Queries */
  const { loading, data } = useQuery(GET_GUIDE_BY_SLUG, {
    variables: {
      slug: slug
    }
  })
  const [createLesson] = useMutation(CREATE_LESSON);
  const [publishLesson] = useMutation(PUBLISH_LESSON);

  /* Functions */
  function addLesson(lesson) {
    createLesson({
      variables: {
        templateId: "",
        ...lesson
      }
    }).then(response => {
      setRedirect(`/lesson/edit/${response.data.createLesson.id}/2`);
      publishLesson({
        variables: {
          ID: response.data.createLesson.id
        }
      })
    });
  }

  if (loading) return <Loader />
  const lesson = {
    guide: data.guide
  }
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
      <LessonDetailsForm lesson={lesson} onSubmit={addLesson} />
      {redirect && <Redirect to={redirect} />}
    </StyledContent>
  )
}

export default AddLesson