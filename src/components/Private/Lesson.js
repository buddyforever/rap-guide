import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import DisplayLesson from '../Lesson/DisplayLesson'
import { StyledContent } from '../../styles/PageStyles'
import LessonDashboard from '../Lesson/LessonDashboard'
import { UserContext } from '../../context/UserContext'

export const Lesson = () => {

  /* Context */
  // TODO check to see if the user has access
  const { user } = useContext(UserContext);

  /* Paramaters */
  let { id } = useParams();

  if (!id) return null
  return (
    <StyledContent>
      {user && user.type === 'educator' ?
        <LessonDashboard id={id} /> : (<DisplayLesson id={id} />)
      }
    </StyledContent>
  )
}

export default Lesson;
