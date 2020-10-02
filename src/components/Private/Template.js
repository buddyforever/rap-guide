import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { StyledContent, Heading } from '../../styles/PageStyles'
import { LessonTemplate } from '../Lesson/LessonTemplate'
import { UserContext } from '../../context/UserContext'
import Loader from '../Loader'

import { useQuery } from '@apollo/react-hooks'
import { GET_LESSON_TEMPLATE_BY_ID } from '../../queries/lessons'

export const Profile = () => {
  /* Context */
  const { user, setUser } = useContext(UserContext);

  /* Paramaters */
  let { id } = useParams();

  /* Queries */
  const { loading, data } = useQuery(GET_LESSON_TEMPLATE_BY_ID, {
    variables: { id }
  });

  if (loading) return <Loader />
  return (
    <StyledContent style={{ marginBottom: "5rem" }}>
      <Heading>
        <h1><span>Lesson Template :</span> {data.lesson.lessonTitle}</h1>
      </Heading>
      <LessonTemplate lesson={data.lesson} />
    </StyledContent>
  )
}

export default Profile;


