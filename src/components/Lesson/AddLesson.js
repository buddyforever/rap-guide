import React, { useContext, useState } from 'react'
import { useParams } from "react-router-dom"
import Loader from '../Loader'

import LessonDetailsForm from './LessonDetailsForm'
import { StyledContent } from '../../styles/PageStyles'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_LESSON } from '../../queries/lessons'
import { GET_GUIDE_BY_ID } from '../../queries/guides'

const AddLesson = () => {

  /* Paramaters */
  let { id } = useParams();

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
      console.log("RESPONSE: ", response);
      alert("Lesson Added");
    });
  }

  if (loading) return <Loader />
  const lesson = {
    guide: data.guide
  }

  return (
    <StyledContent>
      <LessonDetailsForm lesson={lesson} onSubmit={addLesson} />
    </StyledContent>
  )
}

export default AddLesson