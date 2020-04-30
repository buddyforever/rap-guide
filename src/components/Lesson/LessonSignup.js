import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import Login from '../Pages/Login'
import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const LessonSignup = () => {

  /* Params */
  let { id } = useParams();

  /* Queries */
  const { loading, data } = useQuery(GET_LESSON_BY_ID, {
    variables: {
      id: id
    }
  });

  if (loading) return null
  return (
    <StyledContent>
      <Heading>
        <h1>Lesson Signup</h1>
        <MediumSpace>
          <h2>Enrollment for ~ {data.lesson.lessonTitle}</h2>
        </MediumSpace>
      </Heading>
      <Login lesson={data.lesson} />
    </StyledContent>
  )
}

export default LessonSignup;

const GET_LESSON_BY_ID = gql`
  query getLesson($id: ID!) {
    lesson(where: {
        id: $id
    }) {
      id
      lessonTitle
    }
  }
`