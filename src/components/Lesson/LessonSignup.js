import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import Login from '../Pages/Login'
import { useParams, Link } from "react-router-dom"
import { getLocalStorage } from '../../utilities/LocalStorage'
import useGlobal from '../../store/Store'

const LessonSignup = () => {

  let { id } = useParams();
  const [globalState, globalActions] = useGlobal();

  const [lesson, setLesson] = useState(null);

  function loadLesson() {
    if (getLocalStorage("lessons")) {
      setLesson(getLocalStorage("lessons").filter(lesson => lesson.lessonId === id)[0]);
    }
  }

  useEffect(() => {
    loadLesson();
  }, []);

  if (lesson) {
    return (
      <StyledContent>
        <Heading>
          <h1>Lesson Signup</h1>
          <h2>Enrollment for ~ {lesson.title}</h2>
        </Heading>
        <Login lesson={lesson} />
      </StyledContent>
    )
  } else {
    return (<StyledContent><Login /></StyledContent>)
  }
}

export default LessonSignup;

