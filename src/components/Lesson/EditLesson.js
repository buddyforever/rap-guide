import React, { useContext, useState } from 'react'
import { useParams } from "react-router-dom"
import Loader from '../Loader'

import LessonDetailsForm from './LessonDetailsForm'
import { StyledContent } from '../../styles/PageStyles'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_LESSON_BY_ID } from '../../queries/lessons'
import { UPDATE_LESSON_DETAILS } from '../../queries/lessons'

const EditLesson = () => {

  /* Paramaters */
  let { id } = useParams();

  /* Queries */
  const { loading, data } = useQuery(GET_LESSON_BY_ID, {
    variables: {
      id: id
    }
  })
  const [updateLesson] = useMutation(UPDATE_LESSON_DETAILS);

  /* Functions */
  function updateLessonDetails(lesson) {
    updateLesson({
      variables: {
        ...lesson
      }
    }).then(response => {
      console.log("RESPONSE: ", response);
      alert("Lesson Updated");
    });
  }

  if (loading) return <Loader />
  return (
    <StyledContent>
      <LessonDetailsForm lesson={data.lesson} onSubmit={updateLessonDetails} />
    </StyledContent>
  )
}

export default EditLesson